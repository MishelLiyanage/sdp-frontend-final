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
  tasks: string[];
  connectedTo: string[];
}

@Component({
  selector: 'app-scrumboard',
  templateUrl: './scrumboard.component.html',
  styleUrls: ['./scrumboard.component.scss'],
  imports: [CommonModule,
    FormsModule,
    DragDropModule
  ]
})
export class ScrumboardComponent {
  constructor (private router: Router, 
    private taskService: TaskService,
  ) {}

  newTask: string = '';

  columns: Column[] = [
    { name: 'ToDo', id: 'todoList', tasks: [], connectedTo: ['authoringList', 'proofreadingList', 'typesettingList', 'printingList', 'doneList'] },
    { name: 'Authoring', id: 'authoringList', tasks: [], connectedTo: ['todoList', 'proofreadingList', 'typesettingList', 'printingList', 'doneList'] },
    { name: 'Proofreading', id: 'proofreadingList', tasks: [], connectedTo: ['todoList', 'authoringList', 'typesettingList', 'printingList', 'doneList'] },
    { name: 'Typesetting', id: 'typesettingList', tasks: [], connectedTo: ['todoList', 'authoringList', 'proofreadingList', 'printingList', 'doneList'] },
    { name: 'Printing', id: 'printingList', tasks: [], connectedTo: ['todoList', 'authoringList', 'proofreadingList', 'typesettingList', 'doneList'] },
    { name: 'Done', id: 'doneList', tasks: [], connectedTo: ['todoList', 'authoringList', 'proofreadingList', 'typesettingList', 'printingList'] }
  ];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    }
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
      this.taskService.saveModelPaper(modelPaper).subscribe(response => {
        
        if (response.success) {
          let task = new Task(response.modelPaperId);

          // Save Task
          console.log("Im here")
          this.taskService.saveTask(task).subscribe(taskResponse => {
            if (taskResponse.success) {
              this.columns[0].tasks.push(this.newTask);
              this.newTask = '';
            }
          },
          error => {
            console.error('Error saving task:', error);
          });
        }
      });
    }
  }

  updateTask() {
    this.router.navigate(['/features/updateTask']);
  }
}
