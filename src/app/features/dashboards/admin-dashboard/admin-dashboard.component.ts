import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgChartOptions } from 'ag-charts-community';
import { MonthlyProcessedOrdersComponent } from "../../components/charts/monthly-processed-orders/monthly-processed-orders.component";
import { Router } from '@angular/router';
import { OrderCategoryDistributionComponent } from "../../components/charts/order-category-distribution/order-category-distribution.component";
import { RevenueByPaymentMethodComponent } from "../../components/charts/revenue-by-payment-method/revenue-by-payment-method.component";
import { RevenueTrandComponent } from "../../components/charts/revenue-trand/revenue-trand.component";
import { InventoryLevelChartComponent } from "../../components/charts/inventory-level-chart/inventory-level-chart.component";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MonthlyProcessedOrdersComponent,
    OrderCategoryDistributionComponent,
    RevenueByPaymentMethodComponent,
    RevenueTrandComponent,
    InventoryLevelChartComponent
],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent {
  registeredSchools: number = 3366;
  quarterlyOrders: number = 1234;
  totalOrders: number = 1234;
  grade5scholarship: number = 1234;
  grade4scholarship: number = 1234;
  ordersToProcess: number = 1234;
  
  userName: any;

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
