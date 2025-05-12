import { Component } from '@angular/core';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../models/employee.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-employees',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './manage-employees.component.html',
  styleUrl: './manage-employees.component.scss',
})
export class ManageEmployeesComponent {
  searchTerm: string = '';
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => (this.employees = data),
      error: (err) => console.error('Error loading employees', err),
    });
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
