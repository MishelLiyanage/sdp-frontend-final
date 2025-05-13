import { Component } from '@angular/core';
import { PageStartingContainerComponent } from "../../components/page-starting-container/page-starting-container.component";
import { Router } from '@angular/router';
import { OrderCategoryDistributionComponent } from "../../components/charts/order-category-distribution/order-category-distribution.component";
import { MonthlyProcessedOrdersComponent } from "../../components/charts/monthly-processed-orders/monthly-processed-orders.component";
import { RevenueByPaymentMethodComponent } from "../../components/charts/revenue-by-payment-method/revenue-by-payment-method.component";
import { InventoryLevelChartComponent } from "../../components/charts/inventory-level-chart/inventory-level-chart.component";
import { AdminDashboardService } from '../../../services/admin-dashboard.service';

@Component({
  selector: 'app-employee-dashboard',
  imports: [PageStartingContainerComponent, OrderCategoryDistributionComponent, MonthlyProcessedOrdersComponent, RevenueByPaymentMethodComponent, InventoryLevelChartComponent],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.scss'
})
export class EmployeeDashboardComponent {
  registeredSchools: number = 0;
  totalOrders: number = 0;
  grade5scholarship: number = 0;
  grade4scholarship: number = 0;
  grade3scholarship: number = 0;
  ordersToProcess: number = 0;

  constructor(private router: Router,
    private dashboardService: AdminDashboardService
  ) { }

  ngOnInit(): void {
    // console.log('AdminDashboardComponent initialized');
    this.dashboardService.getDashboardStats().subscribe((data) => {
      this.registeredSchools = data.registeredSchools;
      this.totalOrders = data.totalOrders;
      this.grade5scholarship = data.grade5scholarship;
      this.grade4scholarship = data.grade4scholarship;
      this.grade3scholarship = data.grade3scholarship;
      this.ordersToProcess = data.ordersToProcess;
    });
  }

  trackQPPreparation() {
    this.router.navigate(['/features/scrumboard']);
  }
  
  registerSchools() {
    throw new Error('Method not implemented.');
  }

  manageSchools() {
    this.router.navigate(['/features/manageSchools']);
  }

  processOrders() {
    this.router.navigate(['/features/processOrders']);
  }

  manageOrders() {
    this.router.navigate(['/features/manageOrders']);
  }

  placeOrder() {
    this.router.navigate(['/features/placeOrder']);
  }

  logout() {
    throw new Error('Method not implemented.');
  }
}
