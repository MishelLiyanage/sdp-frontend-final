import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgChartOptions } from 'ag-charts-community';
import { MonthlyProcessedOrdersComponent } from "../../components/charts/monthly-processed-orders/monthly-processed-orders.component";
import { Router } from '@angular/router';
import { OrderCategoryDistributionComponent } from "../../components/charts/order-category-distribution/order-category-distribution.component";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MonthlyProcessedOrdersComponent,
    OrderCategoryDistributionComponent
],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent {
  title: string = 'Welcome To Admin Portal';
  description: string = 'Your central hub for managing and overseeing orders, resources, and school accounts efficiently. ';

  registeredSchools: number = 3366;
  quarterlyOrders: number = 1234;
  totalOrders: number = 1234;
  grade5scholarship: number = 1234;
  grade4scholarship: number = 1234;
  ordersToProcess: number = 1234;

  constructor(private router: Router) {
  }

  registerSchools() {
    this.router.navigate(['/auth/register']);
  }

  trackQPPreparation() {
    this.router.navigate(['/features/scrumboard']);
    }

    manageOrders() {
    this.router.navigate(['/features/manageOrders']);
    }

    manageSchools() {
      this.router.navigate(['/features/manageSchools']);
    }
}
