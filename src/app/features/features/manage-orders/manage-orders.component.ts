import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-orders',
  imports: [CommonModule,
    FormsModule
  ],
  templateUrl: './manage-orders.component.html',
  styleUrl: './manage-orders.component.scss',
})
export class ManageOrdersComponent {
  searchTerm: string = '';
  orders = [
    {
      schoolRegistrationNo: "LO-4031",
      orderId: "ORD1001",
      schoolId: "SCH001",
      city: "Negombo",
      orderStatus: "Pending",
      paymentMethod: "Bank Transfer",
      date: "2024-03-15",
      time: "10:30 AM",
      amount: "15000.00",
      action: "View"
    },
    {
      schoolRegistrationNo: "VP-3256",
      orderId: "ORD1002",
      schoolId: "SCH002",
      city: "Colombo 10",
      orderStatus: "Completed",
      paymentMethod: "Cash",
      date: "2024-03-14",
      time: "02:15 PM",
      amount: "20000.00",
      action: "View"
    },
    {
      schoolRegistrationNo: "LO-4032",
      orderId: "ORD1003",
      schoolId: "SCH002",
      city: "Akkareipattu",
      orderStatus: "Processing",
      paymentMethod: "Money Order",
      date: "2024-03-16",
      time: "09:45 AM",
      amount: "18000.00",
      action: "View"
    },
    {
      schoolRegistrationNo: "BH-0001",
      orderId: "ORD1004",
      schoolId: "SCH001",
      city: "Colombo 04",
      orderStatus: "Pending",
      paymentMethod: "Online Payment",
      date: "2024-03-17",
      time: "04:30 PM",
      amount: "22000.00",
      action: "View"
    }
  ];  

  filteredOrders = [...this.orders];

  searchOrder() {
    this.filteredOrders = this.orders.filter(order =>
      order.schoolRegistrationNo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      order.orderId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      order.schoolId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      order.city.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      order.orderStatus.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      order.paymentMethod.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  
  updateOrder(order: any) {
    console.log("Update order:", order);
    // Implement update logic here
  }
  
  deleteOrder(order: any) {
    console.log("Delete order:", order);
    this.orders = this.orders.filter(o => o !== order);
    this.filteredOrders = [...this.orders];
  }
  
}
