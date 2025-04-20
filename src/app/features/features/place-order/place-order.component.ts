import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../../services/user.service';
import { ModelPaperService } from '../../../services/modelPaper.service';
import { OrderService } from '../../../services/order.service';
import { PayPalComponent } from '../../components/pay-pal/pay-pal.component';

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
  imports: [CommonModule, MatTableModule, ReactiveFormsModule, PayPalComponent],
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

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private modelPaperService: ModelPaperService,
    private orderService: OrderService
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

  async onlinePayment(): Promise<void> {
    try {
      // Calculate the total amount before proceeding with PayPal payment
      const amount = await this.calculateTotalAmount();
      console.log('Calculated amount:', amount);
  
      // If the amount is invalid, alert the user
      if (amount <= 0) {
        alert("Invalid total amount for payment.");
        return;
      }
  
      // Ensure PayPal SDK is available
      if (!window.paypal) {
        console.error('PayPal SDK not loaded');
        alert('Unable to load PayPal payment buttons.');
        return;
      }
  
      // If PayPal SDK is loaded, proceed with creating the PayPal button
      window.paypal.Buttons({
        createOrder: async (data: any, actions: any) => {
          try {
            // Make a call to the backend to create an order with the amount
            console.log('Creating PayPal order with amount:', amount);
            const orderResponse = await fetch('http://localhost:8083/paypal/create-order', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ amount: amount.toFixed(2) })
            });
  
            if (!orderResponse.ok) {
              throw new Error('Error creating order with PayPal.');
            }
  
            const orderData = await orderResponse.json();
            return orderData.id;  // Return the PayPal order ID to proceed with the payment
          } catch (error) {
            console.error('Error creating PayPal order:', error);
            alert('There was an issue creating the PayPal order. Please try again.');
            throw error; // Throw error to stop the process
          }
        },
  
        onApprove: async (data: any, actions: any) => {
          try {
            // Capture the order after payment is approved
            const captureResponse = await fetch(`http://localhost:8083/paypal/capture-order/${data.orderID}`, {
              method: 'POST',
            });
  
            if (!captureResponse.ok) {
              throw new Error('Error capturing PayPal payment.');
            }
  
            const details = await captureResponse.json();
            alert('Payment successful! Thank you ' + details.payer.name.given_name);
            console.log(details);
          } catch (error) {
            console.error('Error capturing PayPal payment:', error);
            alert('Payment failed. Please try again.');
          }
        },
  
        onError: (err: any) => {
          console.error('PayPal Error:', err);
          alert('Payment failed. Please try again.');
        }
      }).render('#paypal-button-container');  // Render the PayPal button in the container
    } catch (error) {
      console.error('Error during payment process:', error);
      alert('An error occurred during the payment process. Please try again.');
    }
  }  
}