import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { OrderService } from '../../../services/order.service';
import { OrderDetails } from '../../../models/order-details.model';
import { LoginService } from '../../../services/login.service';
import { Router } from '@angular/router';

interface OrderResponse {
  orderId: string;
  orderItems: string[];
  date: string;
  paymentStatus: string;
  orderStatus: string;
  amount: number;
}

@Component({
  selector: 'app-my-orders',
  imports: [MatTabsModule,
    MatTableModule,
    CommonModule
  ],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss'
})
export class MyOrdersComponent {
  username: string = '';
  userRole: string = '';
  schoolOrders: OrderResponse[] = [];
  currentUserId: number = 0;
  orders: OrderResponse[] = [];

  constructor(private http: HttpClient,
    private userService: UserService,
    private orderService: OrderService,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(
      (userdata) => {
        console.log('User:', userdata);
        this.currentUserId = userdata.id;
        this.username = userdata.username;
        this.userRole = userdata.role; // Assuming 'role' is the property for user role
        // Assuming 'id' is the property for user ID
        this.loadOrders();
      },
      (error) => {
        console.error('Failed to fetch user data', error);
      }
    );
  }

  logout() {
    this.loginService.logout();
  }

  goToDashboard() {
    this.router.navigate(['/dashboards/schoolDashboard']);
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    console.log('Token:', token); // Debugging line to check the token value
    if (!token) {
      console.error('No token found in localStorage!');
      throw new Error('Authentication token not found');
    }
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  loadOrders() {
    this.http.get<OrderResponse[]>(`http://localhost:8083/order/school/${this.currentUserId}`, { headers: this.getHeaders() })
      .subscribe({
        next: (data) => this.schoolOrders = data,
        error: (err) => console.error('Failed to load orders', err)
      });
  }

  deleteOrder(order: OrderResponse) {
    const token = localStorage.getItem('accessToken');
    const userRole = this.getUserRoleFromToken(token ?? '');

    if (userRole === 'ROLE_SCHOOL') {
      if (order.orderStatus === 'Processed') {
        alert("You cannot delete an order that is already processed.");
      } else {
        console.log("status: ", order.orderStatus);
        this.orderService.deleteOrder(order.orderId).subscribe(
          () => {
            console.log('Order deleted:', order);
            this.schoolOrders = this.schoolOrders.filter(o => o.orderId !== order.orderId);
            alert('Order deleted successfully!');
          },
          (error) => console.error('Error deleting order:', error)
        );
      }
    } else {
      alert("You do not have permission to delete an order.");
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
}
