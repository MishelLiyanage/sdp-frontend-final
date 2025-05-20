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
import { LoginService } from '../../../services/login.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-employee-registration',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-registration.component.html',
  styleUrl: './employee-registration.component.scss',
})
export class EmployeeRegistrationComponent implements OnInit {
  role: string = "";
  username: string = "";
  employeeForm!: FormGroup;
  selectedFile: File | null = null;
  departments!: string[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private employeeService: EmployeeService,
        private userService: UserService,
        private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(
      (userdata) => {
        console.log('User:', userdata);
        this.username = userdata.username;
        this.role = userdata.role;
        console.log(this.username + " 123456 ***" + this.role);
        
      },
      (error) => {
        console.error('Failed to fetch user data', error);
      }
    );

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

  logout() {
    this.loginService.logout();
  }

  goToDashboard() {
    if (this.role === "ROLE_ADMIN") {
      this.router.navigate(['/dashboards/adminDashboard']);
    } else {
      this.router.navigate(['/dashboards/employeeDashboard']);
    }
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const formData = this.employeeForm.value;

      this.employeeService.registerEmployee(formData).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          alert('Employee registered successfully!');
          this.router.navigate(['/dashboards/adminDashboard']);
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
