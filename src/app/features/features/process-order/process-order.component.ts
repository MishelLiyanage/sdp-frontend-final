import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
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
  scholarshipTamilOrderIds: string[] = [];
  toValue: number = 0;

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
      paperTo: [0],
      countersFrom: this.fb.array([]),
      countersTo: this.fb.array([])
    });

    // Initialize with 16 counters
    for (let i = 0; i < 16; i++) {
      (this.orderForm.get('countersFrom') as FormArray).push(new FormControl(0));
      (this.orderForm.get('countersTo') as FormArray).push(new FormControl(0));
    }
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
        let formattedDate = '';
        if (details.dateOrdered) {
          const dateObj = new Date(details.dateOrdered);
          formattedDate = dateObj.toISOString().split('T')[0];
        }

        const processedQuantity = Math.ceil(details.numberOfStudents * 1.1);

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

        this.paperProcessingService.getProcessingDetails(grade, category).subscribe({
          next: (processing) => {
            console.log("Received processing details:", processing);
            const from = processing.fromPaperNo;
            const to = processing.toPaperNo;
            const sequenceNo = processing.sequenceNo;

            // Patch the sequence number into the form control
            const formattedSeq = sequenceNo.toString().padStart(2, '0');
            this.orderForm.patchValue({
              seqOfIssue: formattedSeq
            });

            for (let i = from; i <= to; i++) {
              const checkbox = document.querySelector(`input[type="checkbox"][value="${i}"]`) as HTMLInputElement;
              if (checkbox) {
                checkbox.checked = true;
              }
            }

            this.paperProcessingService.getCounterNumber(grade, category).subscribe({
              next: (counterData) => {
                console.log("Received counterData details:", counterData);
                const counterNumber = counterData.counterNumber;

                const countersFromArray = this.orderForm.get('countersFrom') as FormArray;
                const countersToArray = this.orderForm.get('countersTo') as FormArray;
                const processedQuantity = this.orderForm.get('processedQuantity')?.value || 0;

                for (let i = from - 1; i < to; i++) {
                  const fromValue = counterNumber;
                  this.toValue = fromValue + processedQuantity;

                  countersFromArray.at(i).setValue(fromValue);
                  countersToArray.at(i).setValue(this.toValue);
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

  get countersFromControls(): FormControl[] {
    return (this.orderForm.get('countersFrom') as FormArray).controls as FormControl[];
  }

  get countersToControls(): FormControl[] {
    return (this.orderForm.get('countersTo') as FormArray).controls as FormControl[];
  }

  save() {
    const formData = this.orderForm.getRawValue();

    // Step 1: Collect checked paper numbers
    const checkboxes = document.querySelectorAll('.checkbox') as NodeListOf<HTMLInputElement>;
    const checkedNumbers: number[] = [];

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        checkedNumbers.push(Number(checkbox.value));
      }
    });

    const actualFromPaperNo = checkedNumbers.length > 0 ? Math.min(...checkedNumbers) : 0;
    const actualToPaperNo = checkedNumbers.length > 0 ? Math.max(...checkedNumbers) : 0;

    // Step 2: Get the original full 16-length counter arrays
    const allFromCounters: number[] = formData.countersFrom || new Array(16).fill(0);
    const allToCounters: number[] = formData.countersTo || new Array(16).fill(0);

    // Step 3: Only update the values between fromPaperNo and toPaperNo
    const finalFromCounters: number[] = [];
    const finalToCounters: number[] = [];

    for (let i = 0; i < 16; i++) {
      const paperNo = i + 1;
      if (paperNo >= actualFromPaperNo && paperNo <= actualToPaperNo) {
        finalFromCounters.push(allFromCounters[i]);
        finalToCounters.push(allToCounters[i]);
      } else {
        // Retain original value or set 0 if empty
        finalFromCounters.push(0);
        finalToCounters.push(0);
      }
    }

    // Step 4: Prepare processed order
    const processedOrderData = {
      orderId: formData.registeredNo,
      grade: "Grade 5",
      category: "Scholarship Tamil",
      lastCounterNumber: this.toValue,
      processedQuantity: checkedNumbers.length,
      sequenceNo: formData.seqOfIssue,
      dateProcessed: formData.dateSent,
      timeProcessed: formData.timeSent,
      fromPaperNo: actualFromPaperNo,
      toPaperNo: actualToPaperNo,
      counterFromNumbers: finalFromCounters,
      counterToNumbers: finalToCounters
    };

    // Step 5: School details
    const schoolData = {
      name: formData.name,
      address: formData.address,
      contactNo: formData.tel,
      email: formData.email,
      city: formData.city
    };

    const payload = {
      order: processedOrderData,
      school: schoolData
    };

    // Step 6: Send to backend
    this.processOrderService.saveOrderAndSchoolDetails(payload).subscribe({
      next: (response) => {
        console.log('Processed order and school details saved successfully:', response);
        alert('Processed order and school details saved successfully:');

        this.orderForm.reset();
      },
      error: (err) => {
        console.error('Error saving processed order and school details:', err);
      }
    });
  }
}
