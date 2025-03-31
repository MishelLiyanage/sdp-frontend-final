import { ModelPaper } from "./model-paper.model";

export class Task {
  taskId?: number;
  modelPaper : ModelPaper; // Reference to ModelPaper object
  createdDate: string; // Representing LocalDate as string
  createdTime: string; // Representing LocalTime as string
  status: string;
  dueDate?: string;
  assignedEmployee?: string;

  constructor(modelPaper: ModelPaper, status: string, dueDate?: string, assignedEmployee?: string) {
    this.taskId = 0;
    this.modelPaper = modelPaper;
    this.createdDate = new Date().toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
    this.createdTime = new Date().toLocaleTimeString('en-GB', { hour12: false }); // HH:mm:ss format
    this.status = status || 'To Do';
    this.dueDate = dueDate || '';
    this.assignedEmployee = assignedEmployee || '';
  }
}


