export class Task {
  taskId?: number;
  
  modelPaperId: number;
  createdDate: string;
  createdTime: string;
  status: string;

  constructor(modelPaperId: number) {
    this.modelPaperId = modelPaperId;
    this.createdDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    this.createdTime = new Date().toLocaleTimeString('en-GB', { hour12: false }); // HH:mm:ss format
    this.status = 'To Do';
  }
}