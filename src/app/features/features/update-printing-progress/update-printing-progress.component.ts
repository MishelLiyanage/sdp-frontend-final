import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PrintingProgressService } from '../../../services/printingProgress.service';

@Component({
  selector: 'app-update-printing-progress',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-printing-progress.component.html',
  styleUrls: ['./update-printing-progress.component.scss']
})
export class UpdatePrintingProgressComponent implements OnInit {
  printingTaskForm!: FormGroup;
  taskId!: number;

  constructor(
    private fb: FormBuilder,
    private printingProgressService: PrintingProgressService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.printingTaskForm = this.fb.group({
      submittedDate: [this.getTodayDate(), Validators.required],
      deadline: ['', Validators.required],
      expectedQuantity: [0, [Validators.required, Validators.min(1)]],
      remainingToPrintQuantity: [0, [Validators.required, Validators.min(0)]],
      isStarted: [false],
      isSentToInventory: [false]
    });

    console.log('Form Values:', this.printingTaskForm.value);

    this.taskId = +this.route.snapshot.paramMap.get('taskId')!;
    if (!isNaN(this.taskId)) {
      this.loadTaskDetails();
    } else {
      alert('Invalid task ID.');
      this.router.navigate(['/features/scrumboard']);
    }
  }

  private getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  private formatDateToYYYYMMDD(date: any): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  loadTaskDetails(): void {
    this.printingProgressService.getPrintingTask(this.taskId).subscribe({
      next: (task) => {
        if (task) {
          console.log('Task details:', task);
          this.printingTaskForm.patchValue({
            submittedDate: this.getTodayDate(),
            deadline: this.formatDateToYYYYMMDD(task.deadline),
            expectedQuantity: task.expectedQuantity,
            remainingToPrintQuantity: task.remainingToPrintQuantity,
            isStarted: task.started,
            isSentToInventory: task.sentToInventory
          });
        } else {
          alert('No task found with the provided ID.');
        }
      },
      error: (err) => {
        console.error('Failed to load task', err);
        alert('Error retrieving task. It may not exist.');
      }
    });
  }

  onSubmit(): void {
    if (this.printingTaskForm.valid) {
      const updatedPrintingTask = {
        taskId: this.taskId,
        ...this.printingTaskForm.value,
        submittedDate: this.getTodayDate()
      };
  
      console.log('Updated Printing Task:', updatedPrintingTask);
  
      this.printingProgressService.updatePrintingTask(updatedPrintingTask).subscribe({
        next: () => {
          alert('Printing task updated successfully!');
  
          if (this.printingTaskForm.value.isSentToInventory) {
            const inventoryDetails = {
              taskId: this.taskId,
              quantity: this.printingTaskForm.value.expectedQuantity - this.printingTaskForm.value.remainingToPrintQuantity
            };
  
            console.log('Inventory Details:', inventoryDetails);
            this.printingProgressService.addToInventory(inventoryDetails).subscribe({
              next: () => {
                alert('Inventory updated successfully!');
                this.router.navigate(['/features/scrumboard']);
              },
              error: (error) => {
                console.error('Failed to add to inventory:', error);
                alert('Inventory update failed.');
              }
            });
          } else {
            this.router.navigate(['/features/scrumboard']);
          }
        },
        error: (error) => {
          console.error('Update failed:', error);
          alert('Failed to update task.');
        }
      });
    }
  }  
}
