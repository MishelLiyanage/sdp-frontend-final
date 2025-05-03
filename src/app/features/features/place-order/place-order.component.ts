import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../../services/user.service';
import { ModelPaperService } from '../../../services/modelPaper.service';
import { OrderService } from '../../../services/order.service';
import { PayhereService } from '../../../services/payhere.service';
import { Order } from '../../../models/order.model';
import { PaymentService } from '../../../services/payment.service';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Storage } from '@angular/fire/storage';
import { Payment } from '../../../models/payment.model';
import { supabase } from '../../../enviroments/supabase';

export interface PublicationTable {
  publicationName: string;
  quantity: number;
}

declare global {
  interface Window {
    paypal?: any;
  }
}

@Component({
  selector: 'app-place-order',
  standalone: true,
  imports: [CommonModule, MatTableModule, ReactiveFormsModule],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.scss'
})
export class PlaceOrderComponent implements OnInit {
  orderForm: FormGroup;
  orderItems: PublicationTable[] = [];
  orderSummary: any = null;

  dataSource = new MatTableDataSource<PublicationTable>(this.orderItems);
  displayedColumns: string[] = ['publicationName', 'quantity', 'actions'];

  publicationNames: string[] = [];
  paymentMethods: string[] = ['Online', 'Bank Payment / Any Other'];

  selectedPublication: string = '';
  selectedPaymentMethod: string = '';

  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private modelPaperService: ModelPaperService,
    private orderService: OrderService,
    private payhereService: PayhereService,
    private paymentService: PaymentService,
    @Inject(Storage) private storage: Storage
  ) {
    this.orderForm = this.fb.group({
      name: [''],
      email: [''],
      address: [''],
      publication: [''],
      quantity: [''],
      paymentMethod: [''],
      notes: ['']
    });
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(
      (response) => {
        console.log('User:', response);
        this.orderForm.patchValue({
          name: response.name,
          email: response.email,
          address: response.address
        });
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );

    this.modelPaperService.getPublications().subscribe(
      (data) => {
        this.publicationNames = data.map((pub: any) => pub.gradewithcategory);
        console.log('Publications:', this.publicationNames);
      },
      (error) => console.error('Error fetching publications:', error)
    );
  }

  onSelectionChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;

    if (target.name === 'paymentMethods') {
      this.selectedPaymentMethod = selectedValue;
      this.orderForm.patchValue({ paymentMethod: selectedValue });
    } else if (target.name === 'publications') {
      this.selectedPublication = selectedValue;
    }

    console.log(`Selected ${target.name}:`, selectedValue);
  }

  addOrderItem() {
    const publication = this.selectedPublication;
    const quantity = Number(this.orderForm.value.quantity);

    if (publication && quantity > 0) {
      const existingItem = this.orderItems.find(item => item.publicationName === publication);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.orderItems.push({ publicationName: publication, quantity });
      }

      this.dataSource.data = [...this.orderItems];
      this.orderForm.patchValue({ quantity: '' });
    }
  }

  removeOrderItem(index: number): void {
    this.orderItems.splice(index, 1);
    this.dataSource.data = [...this.orderItems];
  }

  async calculateTotalAmount(): Promise<number> {
    try {
      const total = await this.orderService
        .calculateTotalAmount(this.orderItems)
        .toPromise();
      console.log('Total amount:', total);
      return total ?? 0;
    } catch (error) {
      console.error('Error calculating total amount:', error);
      return 0;
    }
  }

  async placeOrder() {
    const paymentMethod = this.selectedPaymentMethod || this.orderForm.value.paymentMethod;

    if (!this.orderItems || this.orderItems.length === 0 || !paymentMethod) {
      alert("Please select a payment method and add at least one order item before placing the order.");
      return;
    }

    const totalAmount = await this.calculateTotalAmount();

    this.orderSummary = {
      schoolName: this.orderForm.value.name,
      email: this.orderForm.value.email,
      address: this.orderForm.value.address,
      orderedPublications: this.orderItems,
      paymentMethod: paymentMethod,
      totalAmount: totalAmount, //********** */
      notes: this.orderForm.value.notes
    };
  }

  submitOrder() {
    if (!this.orderSummary) {
      alert("Please place an order before submitting.");
      return;
    }

    console.log("Order Summary:", this.orderSummary);

    // get current user details
    this.userService.getCurrentUser().subscribe(
      (userdata) => {
        console.log('User:', userdata);

        const contactNo: string = userdata.contactNo;
        const address: string = userdata.address;

        const addressParts = address.split(',');
        const city = addressParts[addressParts.length - 1].trim();

        // Here: Prepare promises to get paperSetIds
        const publicationUpdates = this.orderSummary.orderedPublications.map((pub: any) => {
          return this.orderService.getPaperSetId(pub.publicationName).toPromise().then((paperSetId: number | undefined) => {
            if (paperSetId !== undefined) {
              pub.paperSetId = paperSetId; // Add paperSetId to each publication
              console.log(`PublicationName: ${pub.publicationName}, PaperSetId: ${paperSetId}`);
            } else {
              throw new Error(`PaperSetId is undefined for publicationName: ${pub.publicationName}`);
            }
            return pub;
          });
        });

        Promise.all(publicationUpdates).then((updatedPublications) => {
          console.log('Updated Publications:', updatedPublications);

          // Now create order object after paperSetIds are added
          let order = new Order(
            userdata.id,
            updatedPublications,
            this.orderSummary.totalAmount,
            this.orderSummary.notes,
          );

          this.orderService.placeOrder(order).subscribe(
            (response) => {
              if (response.success) {
                if (this.orderSummary.paymentMethod === 'Online') {
                  console.log('Order placed successfully:', response);
                  var payment = {
                    "sandbox": true,
                    "merchant_id": response.merchant_id,
                    "return_url": "http://localhost:4200/payment-success",
                    "cancel_url": "http://localhost:4200/payment-cancel",
                    "notify_url": "http://localhost:4200/payment-notify",
                    "order_id": response.order_id,
                    "items": "Question Paper Order",
                    "amount": this.orderSummary.totalAmount,
                    "hash_value": response.hashValue,
                    "currency": "LKR",
                    "first_name": this.orderSummary.schoolName,
                    "last_name": "School",
                    "email": this.orderSummary.email,
                    "phone": userdata.contactNo,
                    "address": this.orderSummary.address,
                    "city": city,
                    "country": "Sri Lanka",
                  };

                  console.log('Payment:', payment);
                  console.log('hash_value:666', response.hash_value);

                  this.payhereService.payNow(
                    payment.merchant_id,
                    payment.order_id,
                    payment.items,
                    parseFloat(payment.amount),
                    payment.hash_value,
                    payment.first_name,
                    payment.last_name,
                    payment.email,
                    payment.phone,
                    payment.address,
                    payment.city,
                    payment.country,
                    payment.currency,
                    payment.notify_url,
                    userdata.id,
                    this.orderSummary.paymentMethod
                  );
                  console.log('Order placed successfully:123456', response);
                  alert("Order placed successfully. Proceeding to payment.");

                } else if (this.orderSummary.paymentMethod === 'Bank Payment / Any Other') {
                  console.log('Order placed successfully:', response);
                  alert("Order placed successfully. Please upload your payment slip.");
                  console.log('Order ID: ', response.order_id, 'Have to save the bankslipt and save payment details in the database.'); 

                  // // Upload payment slip if selected
                  // if (this.selectedFile) {
                  //   this.uploadPaymentSlip(this.selectedFile).then((url) => {
                  //     if (url) {
                  //       const payment = new Payment(
                  //         userdata.id,
                  //         response.order_id,
                  //         this.orderSummary.totalAmount,
                  //         url
                  //       );
                  //     } else {
                  //       alert("Error uploading payment slip. Please try again.");
                  //     }
                  //   });
                  // }
                }
              }
            },
            (error) => {
              console.error('Error placing order:', error);
              alert("Error placing order. Please try again.");
            }
          );

        }).catch((error) => {
          console.error('Error fetching paperSetIds:', error);
          alert('Error fetching paper set IDs. Please try again.');
        });

      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async uploadPaymentSlip(file: File): Promise<string | null> {
    const fileName = `${Date.now()}_${file.name}`;
    console.log('Uploading asdasdfile:', fileName);
    const { data, error } = await supabase.storage.from('payments').upload(fileName, file);

    if (error) {
      console.error('Upload error:', error.message);
      return null;
    }

    const { data: publicUrlData } = supabase
      .storage
      .from('payments')
      .getPublicUrl(fileName);

    if (publicUrlData?.publicUrl) {
      console.log('Public URL:', publicUrlData.publicUrl);
      return publicUrlData.publicUrl;
    } else {
      console.error('Error retrieving public URL');
      return null;
    }
  }

}