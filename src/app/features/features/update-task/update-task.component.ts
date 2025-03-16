import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../../services/task.service';
import { EmployeeService } from '../../../services/employee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.scss'],
  imports: [CommonModule,
    ReactiveFormsModule
  ]
})
export class UpdateTaskComponent implements OnInit {
  updateTaskForm!: FormGroup;
  employees: any[] = ['Mishel Fernando', 'Dinalie Liyanage'];

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.updateTaskForm = this.fb.group({
      category: ['', Validators.required],
      grade: ['', Validators.required],
      paperNo: ['', Validators.required],
      partNo: ['', Validators.required],
      assignedDate: ['', Validators.required],
      deadline: ['', Validators.required],
      employee: ['', Validators.required]
    });
    
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (data) => {
        this.employees = data;
      },
      (error) => {
        console.error('Error loading employees:', error);
      }
    );
  }

  onUpdateTask(): void {
    if (this.updateTaskForm.valid) {
      this.taskService.updateTask(this.updateTaskForm.value).subscribe(
        (response) => {
          console.log('Task updated successfully:', response);
          alert('Task updated successfully!');
        },
        (error) => {
          console.error('Error updating task:', error);
          alert('Failed to update task.');
        }
      );
    }
  }
}
