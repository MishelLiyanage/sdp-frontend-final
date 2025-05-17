import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProcessOrderService } from '../../../services/process-order.service';
import { PaperProcessingService } from '../../../services/paper-processing.service';

@Component({
  selector: 'app-process-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './process-order.component.html',
  styleUrl: './process-order.component.scss'
})
export class ProcessOrderComponent {
  orderForm: FormGroup;
  paperCheckboxes: boolean[] = new Array(16).fill(false);
  countersFrom: number[] = new Array(16).fill(0);
  countersTo: number[] = new Array(16).fill(0);

  scholarshipTamilOrderIds: string[] = [];

  constructor(
    private fb: FormBuilder,
    private processOrderService: ProcessOrderService,
    private paperProcessingService: PaperProcessingService
  ) {
    this.orderForm = this.fb.group({
      registeredNo: [''],
      dateOrdered: [{ value: '', disabled: true }],
      totalValue: [{ value: '', disabled: true }],
      name: [''],
      address: [''],
      tel: [''],
      email: [''],
      city: [''],
      Quantity: [{ value: '', disabled: true }],
      students2: [0],
      students3: [0],
      seqOfIssue: [''],
      checkbox1: [false],
      issued: [true],
      processedQuantity: [0],
      dateSent: [''],
      timeSent: [''],
      paperFrom: [0],
      paperTo: [0]
    });
  }

  ngOnInit() {
    this.processOrderService.getScholarshipTamilOrders().subscribe({
      next: (data) => {
        console.log('Scholarship Tamil Grade 5 pending orders:', data);
        this.scholarshipTamilOrderIds = data;
      },
      error: (err) => {
        console.error('Error fetching order IDs:', err);
      }
    });
  }

  processOrder() {
    const selectedId = this.orderForm.get('registeredNo')?.value;

    if (!selectedId) {
      console.warn('No registration ID selected');
      return;
    }

    this.processOrderService.getOrderDetails(selectedId).subscribe({
      next: (details) => {
        // Format and patch order details
        let formattedDate = '';
        if (details.dateOrdered) {
          const dateObj = new Date(details.dateOrdered);
          formattedDate = dateObj.toISOString().split('T')[0];
        }

        let processedQuantity = Math.ceil(details.numberOfStudents * 1.1);

        const now = new Date();
        const currentDate = now.toISOString().split('T')[0];
        const currentTime = now.toTimeString().split(' ')[0].slice(0, 5);

        this.orderForm.patchValue({
          dateOrdered: formattedDate,
          address: details.address || '',
          tel: details.contactNo || '',
          email: details.email || '',
          city: details.city || '',
          Quantity: details.numberOfStudents || 0,
          processedQuantity: processedQuantity || 0,
          name: details.name || '',
          dateSent: currentDate,
          timeSent: currentTime
        });

        this.orderForm.get('totalValue')?.setValue(details.totalAmount || '');

        const grade = 'Grade 5';
        const category = 'Scholarship Tamil';

        // Step 1: Get paper processing range
        this.paperProcessingService.getProcessingDetails(grade, category).subscribe({
          next: (processing) => {
            console.log("Received processing details:", processing);
            const from = processing.fromPaperNo;
            const to = processing.toPaperNo;

            // Step 2: Check checkboxes in range
            this.paperCheckboxes = this.paperCheckboxes.map((_, index) => {
              return (index + 1) >= from && (index + 1) <= to;
            });

            // Step 3: Get counter number and assign to countersFrom[]
            this.paperProcessingService.getCounterNumber(grade, category).subscribe({
              next: (counterData) => {
                const counterNumber = counterData.counterNumber;

                for (let i = from - 1; i < to; i++) {
                  this.countersFrom[i] = counterNumber;
                }
              },
              error: (err) => {
                console.error('Error fetching counter number:', err);
              }
            });
          },
          error: (err) => {
            console.error('Error fetching paper processing details:', err);
          }
        });
      },
      error: (err) => {
        console.error('Error fetching order details:', err);
      }
    });
  }

  onSubmit() {
    console.log(this.orderForm.getRawValue()); // getRawValue to include disabled fields like totalValue
    console.log('Paper checkboxes:', this.paperCheckboxes);
    console.log('Counter From:', this.countersFrom);
    console.log('Counter To:', this.countersTo);
  }
}
