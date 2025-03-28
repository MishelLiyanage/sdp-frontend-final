import { Component } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../../services/task.service';
import { ModelPaper } from '../../../models/model-paper.model';
import { Task } from '../../../models/task.model';

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
  constructor(private router: Router, private taskService: TaskService) {}

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

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // // Update task status after moving
      // const movedTask = event.container.data[event.currentIndex];
      // movedTask.status = this.columns.find((col) => col.id === event.container.id)?.name || movedTask.status;

      // // Call API to update task status in backend
      // this.taskService.updateTaskStatus(movedTask.taskId, movedTask.status).subscribe(
      //   () => console.log('Task status updated'),
      //   (error) => console.error('Error updating task status:', error)
      // );
    } else {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe(
      (response) => {
        if (response.success) {
          // // Clear existing tasks before loading new ones
          // this.columns.forEach((column) => (column.tasks = []));

          response.tasks.forEach((taskData) => {
            let column = this.columns.find((col) => col.name.toLowerCase() === taskData.status.toLowerCase());
            if (column) {
              const task = new Task(
                taskData.modelPaper, // modelPaper object
                taskData.status,
                taskData.dueDate,
                taskData.assignedEmployee
              );
              column.tasks.push(task);
            }
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
    if (this.newTask.trim()) {
      let taskParts = this.newTask.split('-');
      if (taskParts.length < 4) {
        alert('Invalid task format. Use: Grade-Category-PaperNo-PartNo');
        return;
      }

      let modelPaper = new ModelPaper(taskParts[0], taskParts[1], taskParts[2], taskParts[3]);

      // Save Model Paper
      this.taskService.saveModelPaper(modelPaper).subscribe((response) => {
        if (response.success) {
          let task = new Task(
            response.modelPaper, // Use modelPaper object
            'To Do', // Default status
            '', // No due date initially
            '' // No assigned employee initially
          );

          // Save Task
          this.taskService.saveTask(task).subscribe(
            (taskResponse) => {
              if (taskResponse.success) {
                this.columns[0].tasks.push(task); // Add task to the "To Do" column
                this.newTask = ''; // Clear the input field
              }
            },
            (error) => {
              alert('Error saving task. Please try again.');
              console.error('Error saving task:', error);
            }
          );
        }
      });
    }
  }

  updateTask() {
    this.router.navigate(['/features/updateTask']);
  }
}
