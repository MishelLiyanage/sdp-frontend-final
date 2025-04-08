import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import { EmployeeService } from '../../../services/employee.service';
import { CommonModule } from '@angular/common';
import { EmployeeDetails } from '../../../models/employee-details.model';
import { TaskEmployeeAssignment } from '../../../models/task-employee-assignment.model';

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
      assignedDate: [new Date().toISOString().split('T')[0], Validators.required],
      deadline: ['', Validators.required],
      employee: ['', Validators.required]
    });
  
    // Get task from navigation state
    const task = history.state.task;
  
    if (task) {
      this.taskId = task.taskId;
      this.updateTaskForm.patchValue({
        category: task.modelPaper.category,
        grade: task.modelPaper.grade,
        paperNo: task.modelPaper.paperNo,
        partNo: task.modelPaper.partNo,
        assignedDate: new Date().toISOString().split('T')[0],
        deadline: task.dueDate,
        employee: task.assignedEmployee
      });
    } else {
      console.warn('No task object passed. Consider fallback or redirect.');
      // Optional: redirect or show message
      this.router.navigate(['/features/task-list']);
    }
  
    // Load employee options
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
        alert('Failed to load task details.');
      }
    );
  }

  /** 🔹 Load Employees & Bind to Select */
  employeesDetails: EmployeeDetails[] = [];

loadEmployees(): void {
  this.employeeService.getEmployees().subscribe(
    (data: EmployeeDetails[]) => {
      this.employees = data.map(employee => `${employee.id} (${employee.nameWithDepartment})`);
    },
    (error) => {
      console.error('Error loading employees:', error);
      alert('Failed to load employees.');
    }
  );
}

  /** 🔹 Update Task */
  onUpdateTask(): void {
    if (this.updateTaskForm.valid) {
      
      //set the taskId, assignedDate, and deadline in the task object
      const taskData: TaskEmployeeAssignment = { 
        taskId: this.taskId,
        assignedDate: this.updateTaskForm.value.assignedDate,
        deadline: this.updateTaskForm.value.deadline,
        employeeId: Number(this.updateTaskForm.value.employee.split(' ')[0]) // Extract employee ID from the string
      };
      
      this.taskService.updateTask(taskData).subscribe(
        (response) => {
          console.log('Task updated successfully:', response);
          alert('Task updated successfully!');
          this.router.navigate(['/features/scrumboard']); // Navigate back after update
        },
        (error) => {
          console.error('Error updating task:', error);
          alert('Failed to update task.');
        }
      );
    }
  }
}
