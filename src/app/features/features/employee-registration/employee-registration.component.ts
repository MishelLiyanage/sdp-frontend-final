import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service'; // adjust the path as needed

@Component({
  selector: 'app-employee-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-registration.component.html',
  styleUrl: './employee-registration.component.scss',
})
export class EmployeeRegistrationComponent implements OnInit {
  employeeForm!: FormGroup;
  selectedFile: File | null = null;
  departments!: string[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      address: ['', Validators.required],
      contact_no: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      department_name: ['', Validators.required],
      profile_pic: [null] 
    });

    this.employeeService.getDepartmentNames().subscribe({
    next: (data) => (this.departments = data),
    error: (err) => console.error('Failed to load departments', err)
  });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.employeeForm.patchValue({ profile_pic: file.name }); // store file name for DTO
    }
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const formData = this.employeeForm.value;

      this.employeeService.registerEmployee(formData).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          alert('Employee registered successfully!');
          this.router.navigate(['/dashboard/empl']);
        },
        error: (error) => {
          console.error('Registration failed', error);
          alert('Registration failed!');
        }
      });
    }
  }

  onCancel() {
    this.router.navigate(['/dashboards/adminDashboard']);
  }
}
