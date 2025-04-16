import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../../services/user.service';
import { ModelPaperService } from '../../../services/modelPaper.service';

export interface PublicationTable {
  publicationName: string;
  quantity: number;
}

@Component({
  selector: 'app-place-order',
  imports: [CommonModule, MatTableModule, ReactiveFormsModule],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.scss'
})

export class PlaceOrderComponent {
  orderForm: FormGroup;
  orderItems: any[] = [];
  orderSummary: any = null;
  // Definition of the dataSource as MatTableDataSource to dynamically update the table
  dataSource = new MatTableDataSource<PublicationTable>(this.orderItems);

  publicationNames: string[] = [];

  paymentMethods: String[] = [
    'Online',
    'Bank Payment / Any Other'
  ]

  selectedPublication: string = '';
  selectedPaymentMethod: string = '';

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

  displayedColumns: string[] = ['publicationName', 'quantity'];

  constructor(private fb: FormBuilder, private userService: UserService, private modelPaperService: ModelPaperService) {
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
        // this.setUserDetails(response); // Optional helper method
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
  

  addOrderItem() {
    const publication = this.selectedPublication; // Use selectedPublication instead of formControl
    const quantity = this.orderForm.value.quantity;
  
    if (publication && quantity) {
      // Add new order item to the list
      this.orderItems.push({ publicationName: publication, quantity });
  
      // Refresh the table with the updated order items
      this.dataSource.data = [...this.orderItems];
  
      // Clear input fields
      this.orderForm.patchValue({ quantity: '' });
    }
  }

  placeOrder() {
    this.orderSummary = {
      schoolName: this.orderForm.value.name,
      email: this.orderForm.value.email,
      address: this.orderForm.value.address,
      orderedPublications: this.orderItems,
      paymentMethod: this.selectedPaymentMethod || this.orderForm.value.paymentMethod,
      notes: this.orderForm.value.notes,
      totalAmount: this.calculateTotalAmount()
    };
  }

  calculateTotalAmount() {
    let total = 0;
    this.orderItems.forEach(item => {
      total += item.quantity * 75; // Assuming Rs. 75 per publication
    });
    return total;
  }
}
