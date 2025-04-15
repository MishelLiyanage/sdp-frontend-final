export class Task {
  submittedDate: any;
  deadline: any;
  expectedQuantity: any;
  remainingQuantity: any;
  isStarted: any;
  isSentToInventory: any;

  constructor(
    public modelPaper: any,
    public status: string,
    public dueDate: string,
    public assignedEmployee: any
  ) {}

  taskId?: number;

  assignment?: {
    employeeId: number;
    assignedDate: string;
    deadline: string;
  };

  printingProgress?: {
    submittedDate: string;
    expectedQuantity: number;
    remainingToPrintQuantity: number;
    isStarted: boolean;
    isSentToInventory: boolean;
  };
}
