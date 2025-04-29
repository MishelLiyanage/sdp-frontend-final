export class Payment {
    id?: number;  
    school_id: number;
    order_id: number;
    amount: number;
    date: string;   // To store the current date
    time: string;   // To store the current time
    payment_method: string; // To store the payment method (e.g., 'PayHere', 'Cash', etc.)
  
    constructor(
      school_id: number,
      order_id: number,
      amount: number,
      payment_method: string
    ) {
      this.school_id = school_id;
      this.order_id = order_id;
      this.amount = amount;
      this.payment_method = payment_method;
      
      const now = new Date();
      this.date = now.toISOString().split('T')[0]; // Format: YYYY-MM-DD
      this.time = now.toTimeString().split(' ')[0]; // Format: HH:MM:SS
    }
  }
  