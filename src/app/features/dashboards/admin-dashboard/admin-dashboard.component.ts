import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgChartOptions } from 'ag-charts-community';
import { MonthlyProcessedOrdersComponent } from '../../components/charts/monthly-processed-orders/monthly-processed-orders.component';
import { Router } from '@angular/router';
import { OrderCategoryDistributionComponent } from '../../components/charts/order-category-distribution/order-category-distribution.component';
import { RevenueByPaymentMethodComponent } from '../../components/charts/revenue-by-payment-method/revenue-by-payment-method.component';
import { RevenueTrandComponent } from '../../components/charts/revenue-trand/revenue-trand.component';
import { InventoryLevelChartComponent } from '../../components/charts/inventory-level-chart/inventory-level-chart.component';
import { AdminDashboardService } from '../../../services/admin-dashboard.service';
import { LoginService } from '../../../services/login.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MonthlyProcessedOrdersComponent,
    OrderCategoryDistributionComponent,
    RevenueByPaymentMethodComponent,
    RevenueTrandComponent,
    InventoryLevelChartComponent,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss',
})
export class AdminDashboardComponent {
  role: string = "";
  username: string = "";
  registeredSchools: number = 0;
  totalOrders: number = 0;
  grade5scholarship: number = 0;
  grade4scholarship: number = 0;
  grade3scholarship: number = 0;
  ordersToProcess: number = 0;

  constructor(
    private router: Router,
    private dashboardService: AdminDashboardService,
    private loginService: LoginService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
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

    this.dashboardService.getDashboardStats().subscribe((data) => {
      this.registeredSchools = data.registeredSchools;
      this.totalOrders = data.totalOrders;
      this.grade5scholarship = data.grade5scholarship;
      this.grade4scholarship = data.grade4scholarship;
      this.grade3scholarship = data.grade3scholarship;
      this.ordersToProcess = data.ordersToProcess;
    });
  }

  generateParcelList() {
    this.router.navigate(['/features/generateParcelList']);
  }

  registerEmployees() {
    this.router.navigate(['/features/registerEmployee']);
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

  manageEmployees() {
    this.router.navigate(['/features/manageEmployees']);
  }

  processOrders() {
    this.router.navigate(['/features/processOrderNavigator']);
  }

  settings() {
    this.router.navigate(['/features/settings']);
  }

  logout() {
    this.loginService.logout();
  }
}
