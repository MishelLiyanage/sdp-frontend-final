import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { PaperProcessingService } from '../../../services/paper-processing.service';

@Component({
  selector: 'app-counter-settings',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './counter-settings.component.html',
  styleUrl: './counter-settings.component.scss'
})
export class CounterSettingsComponent implements OnInit {
  counterForm!: FormGroup;

  constructor(private fb: FormBuilder,
    private paperProcessingService: PaperProcessingService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.counterForm = this.fb.group({
      counterNumber: ['', [Validators.required, Validators.min(1)]],
      grade: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.counterForm.valid) {
      const formData = this.counterForm.value;

      this.paperProcessingService.savePaperNumbering(formData).subscribe({
        next: (response) => {
          console.log('Saved successfully:', response);
          alert('Counter data saved successfully!');
          this.counterForm.reset();
        },
        error: (err) => {
          console.error('Error saving data:', err);
          alert('Failed to save data. Please try again.');
        },
      });
    } else {
      this.markFormGroupTouched(this.counterForm);
    }
  }

  markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if ((control as any).controls) {
        this.markFormGroupTouched(control as FormGroup);
      }
    });
  }
}
