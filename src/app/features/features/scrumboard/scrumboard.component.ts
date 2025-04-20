import { Component } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import { ModelPaper } from '../../../models/model-paper.model';
import { Task } from '../../../models/task.model';
import { PrintingProgressService } from '../../../services/printingProgress.service';
import { PaperSets } from '../../../models/PaperSets.model';

interface Column {
  name: string;
  id: string;
  tasks: Task[];
  connectedTo: string[];
}

@Component({
  selector: 'app-scrumboard',
  templateUrl: './scrumboard.component.html',
  styleUrls: ['./scrumboard.component.scss'],
  imports: [CommonModule, FormsModule, DragDropModule],
})
export class ScrumboardComponent {
  constructor(
    private router: Router, 
    private taskService: TaskService, 
    private printingProrgessService: PrintingProgressService) { }

  newTask: string = '';

  columns: Column[] = [
    {
      name: 'To Do',
      id: 'todoList',
      tasks: [],
      connectedTo: ['authoringList', 'proofreadingList', 'typesettingList', 'printingList', 'doneList'],
    },
    {
      name: 'Authoring',
      id: 'authoringList',
      tasks: [],
      connectedTo: ['todoList', 'proofreadingList', 'typesettingList', 'printingList', 'doneList'],
    },
    {
      name: 'Proof Reading',
      id: 'proofreadingList',
      tasks: [],
      connectedTo: ['todoList', 'authoringList', 'typesettingList', 'printingList', 'doneList'],
    },
    {
      name: 'Type Setting',
      id: 'typesettingList',
      tasks: [],
      connectedTo: ['todoList', 'authoringList', 'proofreadingList', 'printingList', 'doneList'],
    },
    {
      name: 'Printing',
      id: 'printingList',
      tasks: [],
      connectedTo: ['todoList', 'authoringList', 'proofreadingList', 'typesettingList', 'doneList'],
    },
    {
      name: 'Done',
      id: 'doneList',
      tasks: [],
      connectedTo: ['todoList', 'authoringList', 'proofreadingList', 'typesettingList', 'printingList'],
    },
  ];

  grades: string[] = ['Grade 3', 'Grade 4', 'Grade 5'];
  categories: string[] = ['Scholarship Tamil', 'Scholarship Sinhala'];
  paperNumbers: number[] = Array.from({ length: 16 }, (_, i) => i + 1);
  partNumbers: number[] = [1, 2];

  selectedGrade!: string;
  selectedCategory!: string;
  selectedPaperNumber!: number;
  selectedPartNumber!: number;

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Find the moved task
      const movedTask = event.container.data[event.currentIndex];

      // Ensure taskId is valid
      if (movedTask.taskId === 0) {
        console.error('Invalid taskId:', movedTask.taskId);
        alert('Invalid task ID. Please try again.');

        transferArrayItem(
          event.container.data,
          event.previousContainer.data,
          event.currentIndex,
          event.previousIndex
        );

        return; // Prevent further actions if taskId is invalid
      }

      // Determine new status based on the column ID
      const newStatus = this.columns.find((col) => col.id === event.container.id)?.name || movedTask.status;

      // Only update if the status has changed
      if (movedTask.status !== newStatus) {
        movedTask.status = newStatus;

        if (movedTask.status === 'Printing') {
          const token = localStorage.getItem('accessToken');

          if (token) {
            const userRole = this.getUserRoleFromToken(token);

            if (userRole === 'ROLE_EMPLOYEE') { //****************make it === */
              this.router.navigate(['/features/updatePrintingProgress', movedTask.taskId]);
            } else {
              alert('You do not have permission to access this form.');
            }
          } else {
            alert('No authentication token found. Please log in.');
          }
        }

        // Call API to update task status in backend
        if (movedTask.taskId) {
          this.taskService.updateTaskStatus(movedTask.taskId, newStatus).subscribe({
            next: () => {
              console.log('Task status updated successfully');
              alert('Task status updated successfully!');
            },
            error: (error) => {
              console.error('Error updating task status:', error);
              alert('Error updating task status. Please try again.');

              // Handle failure (optional rollback)
              transferArrayItem(
                event.container.data,
                event.previousContainer.data,
                event.currentIndex,
                event.previousIndex
              );
            }
          });
        } else {
          console.error('Task ID is missing for status update');
          alert('Task ID is missing for status update. Please try again.');
        }
      }
    } else {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  getUserRoleFromToken(token: string): string | null {
    try {
        const tokenPayload = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
        return tokenPayload.role || null; // Assuming 'role' field is present
    } catch (error) {
        console.error('Invalid token format', error);
        return null;
    }
}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(
      (response) => {
        if (response.success) {
          response.tasks.forEach((taskData) => {
            let column = this.columns.find(
              (col) => col.name.toLowerCase() === taskData.status.toLowerCase()
            );
  
            if (!column) {
              console.error('Column not found for status:', taskData.status);
              alert('Column not found for status: ' + taskData.status);
              return;
            }
  
            const task = new Task(
              taskData.modelPaper,
              taskData.status,
              taskData.dueDate,
              taskData.assignedEmployee
            );
  
            task.taskId = taskData.taskId;
            column.tasks.push(task);
  
            // 🔁 Fetch assignment details
            this.taskService.getAssignmentByTaskId(task.taskId ?? 0).subscribe(
              (assignment) => {
                task.assignment = {
                  employeeId: assignment.employeeId,
                  assignedDate: assignment.assignedDate,
                  deadline: assignment.deadline
                };
              },
              (error) => {
                console.error(`Failed to load assignment for task ID ${task.taskId}`, error);
              }
            );
  
            // 🆕 Fetch printing progress details
            this.printingProrgessService.getPrintingProgressByTaskId(task.taskId ?? 0).subscribe(
              (progress) => {
                task.printingProgress = {
                  submittedDate: progress.submittedDate,
                  expectedQuantity: progress.expectedQuantity,
                  remainingToPrintQuantity: progress.remainingToPrintQuantity,
                  isStarted: progress.isStarted,
                  isSentToInventory: progress.isSentToInventory
                };
                console.log('Printing progress loaded:', task.printingProgress);
              },
              (error) => {
                console.error(`Failed to load printing progress for task ID ${task.taskId}`, error);
              }
            );
          });
        }
      },
      (error) => {
        alert('Error loading tasks. Please try again.');
        console.error('Error loading tasks:', error);
      }
    );
  }  

  addTask() {
    // Ensure all dropdowns have selected values
    if (!this.selectedGrade || !this.selectedCategory || !this.selectedPaperNumber || !this.selectedPartNumber) {
      alert('Please select all fields before adding a task.');
      return;
    }

    // Create a ModelPaper object
    let modelPaper = new ModelPaper(
      this.selectedGrade,
      this.selectedCategory,
      "Paper " + this.selectedPaperNumber.toString(), // Convert number to string if needed
      "Part " + this.selectedPartNumber.toString()
    );

    let paperSet = new PaperSets(
      this.selectedGrade,
      this.selectedCategory
    )

    // Save Model Paper
    this.taskService.saveModelPaper(modelPaper).subscribe(
      (response) => {
        if (response.success) {
          let task = new Task(
            response.modelPaper, 
            'To Do', // Default status
            '', // No due date initially
            '' // No assigned employee initially
          );

          this.taskService.savePaperSet(paperSet).subscribe(
            (paperSetResponse) => {
              if (paperSetResponse.success) {
                alert('Paper set saved successfully!');
                console.log('Paper set saved successfully:', paperSetResponse.paperSet);
              } else {
                alert('PaperSet already exists!');
                console.error('Error saving paper set:', paperSetResponse.message);
              }
            }
          );

          // Save Task
          this.taskService.saveTask(task).subscribe(
            (taskResponse) => {
              if (taskResponse.success) {
                this.columns[0].tasks.push(task); // Add task to the "To Do" column

                alert('Task added successfully!');
                console.log('Task added successfully:', taskResponse.task);

                // Clear the selection after adding task
                this.selectedGrade = '';
                this.selectedCategory = '';
                this.selectedPaperNumber = 0;
                this.selectedPartNumber = 0;
              }
            },
            (error) => {
              alert('Error saving task. Please try again.');
              console.error('Error saving task:', error);
            }
          );
        }
      },
      (error) => {
        if (error.error && error.error.message === 'Model paper already exists.') {
          alert('Error: Model paper already exists.');
        } else {
          alert('Error saving model paper. Please try again.');
        }
        console.error('Error saving model paper:', error);
      }
    );
  }

  updateTask(task: any) {
    console.log('Navigating to update task with object:', task);
  
    if (task.status === 'Printing') {
      // const token = localStorage.getItem('accessToken');
      // const userRole = this.getUserRoleFromToken(token ?? '');
      // if (userRole === 'ROLE_EMPLOYEE') {
      //   alert('You do not have permission to access this form.');
      //   return;
      // }
      this.router.navigate(['/features/updatePrintingProgress', task.taskId]);
    } else {
      this.router.navigate(['/features/updateTask'], { state: { task } });
    }
  }
    
}
