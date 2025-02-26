import { Component } from '@angular/core';
import { RecentPublicationsComponent } from "../../components/recent-publications/recent-publications.component";
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

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

  onSelectionChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedPublication = target.value;
    console.log('Selected Publication:', this.selectedPublication);
  }

  displayedColumns: string[] = ['publicationName', 'quantity'];
  dataSource: PublicationTable[] = [
    { publicationName: 'Grade 5 Scholarship 2025 (Tamil Medium)', quantity: 100 },
    { publicationName: 'Grade 4 Scholarship 2025 (Tamil Medium)', quantity: 200 },
    { publicationName: 'Grade 5 Scholarship 2025 (Sinhala Medium)', quantity: 20 },
    { publicationName: 'Grade 4 Scholarship 2025 (Sinhala Medium)', quantity: 50 }
  ];

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
    const publication = this.orderForm.value.publication;
    const quantity = this.orderForm.value.quantity;

    if (publication && quantity) {
      this.orderItems.push({ publicationName: publication, quantity });
      this.orderForm.patchValue({ publication: '', quantity: '' });
    }
  }

  placeOrder() {
    this.orderSummary = {
      schoolName: this.orderForm.value.name,
      email: this.orderForm.value.email,
      address: this.orderForm.value.address,
      orderedPublications: this.orderItems,
      paymentMethod: this.orderForm.value.paymentMethod,
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
