import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../services/order.service';
import { OrderDetail } from '../../../models/order-detail.model';

@Component({
  selector: 'app-generate-parcel-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './generate-parcel-list.component.html',
  styleUrl: './generate-parcel-list.component.scss'
})
export class GenerateParcelListComponent implements OnInit {
  role: string = "";
  username: string = "";
  currentOrderId: string = '';
  orderIds: string[] = [];
  page: 'entry' | 'details' = 'entry';
  orderDetails: OrderDetail[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private loginService: LoginService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(
      (userdata) => {
        console.log('User:', userdata);
        this.username = userdata.username;
        this.role = userdata.role;
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
    if (this.role === "ROLE_ADMIN") {
      this.router.navigate(['/dashboards/adminDashboard']);
    } else {
      this.router.navigate(['/dashboards/employeeDashboard']);
    }
  }

  handleAddOrder(): void {
    if (this.currentOrderId.trim() === '') return;
    if (this.orderIds.length >= 16) {
      alert('Maximum 16 order IDs allowed');
      return;
    }

    this.orderIds.push(this.currentOrderId.trim());
    this.currentOrderId = '';
  }

  handleRemoveOrder(indexToRemove: number): void {
    this.orderIds = this.orderIds.filter((_, index) => index !== indexToRemove);
  }

  handleViewDetails(): void {
    if (this.orderIds.length === 0) {
      alert('Please enter at least one order ID');
      return;
    }

    this.orderService.getOrderDetailsByIds(this.orderIds).subscribe({
      next: (details) => {
        this.orderDetails = details;
        this.page = 'details';
      },
      error: (err) => {
        console.error('Failed to fetch order details:', err);
        alert('Failed to retrieve order details. Please try again.');
      }
    });
  }

  handleBack(): void {
    this.page = 'entry';
  }

  print() {
    const printContents = document.getElementById('order-print-section')?.innerHTML;

    if (printContents) {
      // Store original body content
      const originalContents = document.body.innerHTML;

      // Create a new window
      const printWindow = window.open('', '_blank');

      if (printWindow) {
        printWindow.document.open();
        printWindow.document.write(`
        <html>
          <head>
            <title>Order Details</title>
            <style>
              body {
                font-family: Quattrocento Sans",serif;
                margin: 20px;
              }
              .order-card {
                border: 1px solid #ccc;
                padding: 15px;
                margin-bottom: 20px;
                page-break-inside: avoid;
              }
              .order-title {
                margin-top: 0;
                font-size: 1rem;
                border-bottom: 1px solid #eee;
                padding-bottom: 10px;
              }
              .order-info p {
                margin: 8px 0;
              }
              .label {
                font-weight: bold;
                display: inline-block;
                width: 100px;
                font-size: 1rem;
              }
              @media print {
                button {
                  display: none;
                }
              }
            </style>
          </head>
          <body>
            <h1>Order Details</h1>
            ${printContents}
            <script>
              // Use setTimeout to ensure content is fully loaded before printing
              setTimeout(function() {
                window.print();
                // Don't close automatically - let the user close the window
              }, 500);
            </script>
          </body>
        </html>
      `);
        printWindow.document.close();
        printWindow.focus();
      } else {
        alert('Popup blocked. Please allow popups for this site.');
      }
    }
  }
}
