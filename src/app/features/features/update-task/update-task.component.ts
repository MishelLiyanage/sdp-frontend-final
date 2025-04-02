import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import { EmployeeService } from '../../../services/employee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class UpdateTaskComponent implements OnInit {
  updateTaskForm!: FormGroup;
  employees: string[] = []; // Employee names with department
  taskId!: number;
  
  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize Form
    this.updateTaskForm = this.fb.group({
      category: ['', Validators.required],
      grade: ['', Validators.required],
      paperNo: ['', Validators.required],
      partNo: ['', Validators.required],
      assignedDate: [new Date().toISOString().split('T')[0], Validators.required], // Current Local Date
      deadline: ['', Validators.required],
      employee: ['', Validators.required]
    });

    // Get Task ID from Route Parameters (If taskId is passed via route)
    this.route.paramMap.subscribe(params => {
      const id = params.get('taskId');
      console.log('Task ID from route:', id);
      if (id) {
        this.taskId = +id;
        this.loadTaskDetails(this.taskId);
      }
    });

    // Load Employees
    this.loadEmployees();
  }

  /** 🔹 Load Task Details & Bind to Form */
  loadTaskDetails(taskId: number): void {
    this.taskService.getTaskById(taskId).subscribe(
      (task) => {
        this.updateTaskForm.patchValue(task);
      },
      (error) => {
        console.error('Error loading task details:', error);
      }
    );
  }

  /** 🔹 Load Employees & Bind to Select */
  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (data) => {
        // Transform employees to format: "Name - Department"
        this.employees = data.map((emp: any) => `${emp.name} - ${emp.department}`);
      },
      (error) => {
        console.error('Error loading employees:', error);
      }
    );
  }

  /** 🔹 Update Task */
  onUpdateTask(): void {
    if (this.updateTaskForm.valid) {
      this.taskService.updateTask(this.taskId, this.updateTaskForm.value).subscribe(
        (response) => {
          console.log('Task updated successfully:', response);
          alert('Task updated successfully!');
          this.router.navigate(['/features/task-list']); // Navigate back after update
        },
        (error) => {
          console.error('Error updating task:', error);
          alert('Failed to update task.');
        }
      );
    }
  }
}
