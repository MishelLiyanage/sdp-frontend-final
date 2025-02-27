import { Component } from '@angular/core';
import { RecentPublicationsComponent } from "../../components/recent-publications/recent-publications.component";
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

export interface PublicationTable {
  publicationName: string;
  quantity: number;
}

@Component({
  selector: 'app-place-order',
  imports: [RecentPublicationsComponent, CommonModule, MatTableModule, ReactiveFormsModule],
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.scss'
})

export class PlaceOrderComponent {
  orderForm: FormGroup;
  orderItems: any[] = [];
  orderSummary: any = null;
  // Define the dataSource as MatTableDataSource to dynamically update the table
  dataSource = new MatTableDataSource<PublicationTable>(this.orderItems);

  publications = [
    { name: 'Grade 5 Scholarship 2025 (Tamil Medium)' },
    { name: 'Grade 4 Scholarship 2025 (Tamil Medium)' },
    { name: 'Grade 5 Scholarship 2025 (Sinhala Medium)' },
    { name: 'Grade 4 Scholarship 2025 (Sinhala Medium)' }
  ];

  publicationNames: string[] = [
    'Grade 5 Scholarship 2025 (Tamil Medium)',
    'Grade 4 Scholarship 2025 (Tamil Medium)',
    'Grade 5 Scholarship 2025 (Sinhala Medium)',
    'Grade 4 Scholarship 2025 (Sinhala Medium)'
  ];

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

  constructor(private fb: FormBuilder) {
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
