import { Component } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../models/employee.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-manage-employees',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './manage-employees.component.html',
  styleUrl: './manage-employees.component.scss',
})
export class ManageEmployeesComponent {
  role: string = "";
  username: string = "";
  searchTerm: string = '';
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
        private userService: UserService,
        private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(
      (userdata) => {
        console.log('User:', userdata);
        this.username = userdata.username;
        this.role = userdata.role;
      },
      (error) => {
        console.error('Failed to fetch user data', error);
      }
    );

    this.employeeService.getAllEmployees().subscribe({
      next: (data) => (this.employees = data),
      error: (err) => console.error('Error loading employees', err),
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

  searchEmployees() {
    this.filteredEmployees = this.employees.filter(
      (employee) =>
        employee.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        employee.departmentName.toLocaleLowerCase().includes(this.searchTerm.toLocaleLowerCase()) ||
        employee.username.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  deleteEmployee(_t17: Employee) {
    throw new Error('Method not implemented.');
  }

  updateEmployee(_t17: Employee) {
    throw new Error('Method not implemented.');
  }

  backToHome() {
    this.router.navigate(['/dashboards/adminDashboard']);
  }
}
