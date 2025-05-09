import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-process-order',
  imports: [CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './process-order.component.html',
  styleUrl: './process-order.component.scss'
})
export class ProcessOrderComponent {
  orderForm: FormGroup;
  paperCheckboxes: boolean[] = new Array(16).fill(false);
  countersFrom: number[] = new Array(16).fill(0);
  countersTo: number[] = new Array(16).fill(0);

  constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      registeredNo: ['LO-2003'],
      dateApplied: [''],
      totalValue: [{ value: '11934.00', disabled: true }],
      address: ['The Principal,\nBD / ROSSETT TAMIL VIDYALAYA,\nHALIELA.'],
      tel: [''],
      fax: [''],
      railway: [''],
      email: [''],
      city: ['HALIELA'],
      students1: [17],
      students2: [0],
      students3: [0],
      seqOfIssue: ['01'],
      checkbox1: [false],
      issued: [true],
      parcels: [0],
      dateSent: [''],
      timeSent: [''],
      paperFrom: [1],
      paperTo: [4]
    });
  }

  onSubmit() {
    console.log(this.orderForm.value);
    console.log("Paper checkboxes:", this.paperCheckboxes);
    console.log("Counter From:", this.countersFrom);
    console.log("Counter To:", this.countersTo);
  }
}
