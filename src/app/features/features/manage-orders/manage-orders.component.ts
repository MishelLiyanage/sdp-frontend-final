import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../services/order.service';
import { OrderDetails } from '../../../models/order-details.model';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class ManageOrdersComponent implements OnInit {
  role: string = "";
  username: string = "";
  searchTerm: string = '';
  orders: OrderDetails[] = [];
  filteredOrders: OrderDetails[] = [];

  constructor(private orderService: OrderService,
    private router: Router,
    private userService: UserService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(
      (userdata) => {
        console.log('User:', userdata);
        this.username = userdata.username;
        this.role = userdata.role;
        console.log(this.username + " 123456 ***" + this.role);
        
      },
      (error) => {
        console.error('Failed to fetch user data', error);
      }
    );

    this.loadOrders();
  }

  logout() {
    this.loginService.logout();
  }

  goToDashboard() {
    if (this.role === "ROLE_ADMIN") {
      this.router.navigate(['/dashboards/adminDashboard']);
    } else {
      this.router.navigate(['/dashboards/employeeDashboard']);
    }
  }

  loadOrders() {
    this.orderService.getOrders().subscribe(
      (data: OrderDetails[]) => {
        console.log('Orders:', data);
        this.orders = data;
        this.filteredOrders = [...this.orders];
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  formatTime(time: any): string {
    if (!time || time[0] === undefined || time[1] === undefined) return '';

    let hour = time[0];
    const minute = time[1];
    const ampm = hour >= 12 ? 'P.M.' : 'A.M.';

    hour = hour % 12;
    hour = hour === 0 ? 12 : hour;

    const formattedMinute = minute < 10 ? '0' + minute : minute;
    return `${hour}.${formattedMinute} ${ampm}`;
  }

  searchOrder() {
    this.filteredOrders = this.orders.filter(order =>
      order.orderId.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      order.schoolName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      order.city.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      order.paymentStatus.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      order.paymentMethod.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      order.orderStatus.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  updateOrder(order: OrderDetails) {
    console.log('Updating order:', order);
    this.router.navigate(['/features/updateOrder'], { state: { order } });
  }

  print() {
    const printContents = document.getElementById('print-section')?.innerHTML;
    if (printContents) {
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); // Reload to restore original state
    }
  }
}