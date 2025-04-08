export class TaskEmployeeAssignment {
  taskId: number;
  assignedDate: Date;
  deadline: Date;
  employeeId: number;

  constructor(taskId: number, assignedDate: Date, deadline: Date,  employeeId: number) {
    this.taskId = taskId;
    this.assignedDate = assignedDate;
    this.deadline = deadline;
    this.employeeId = employeeId;
  }
}