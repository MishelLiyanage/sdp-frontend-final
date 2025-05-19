import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderCategoryDistributionComponent } from "../../components/charts/order-category-distribution/order-category-distribution.component";
import { MonthlyProcessedOrdersComponent } from "../../components/charts/monthly-processed-orders/monthly-processed-orders.component";
import { RevenueByPaymentMethodComponent } from "../../components/charts/revenue-by-payment-method/revenue-by-payment-method.component";
import { InventoryLevelChartComponent } from "../../components/charts/inventory-level-chart/inventory-level-chart.component";
import { AdminDashboardService } from '../../../services/admin-dashboard.service';
import { LoginService } from '../../../services/login.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-employee-dashboard',
  imports: [OrderCategoryDistributionComponent, MonthlyProcessedOrdersComponent, RevenueByPaymentMethodComponent, InventoryLevelChartComponent],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.scss'
})
export class EmployeeDashboardComponent {
  username: string = "";
  registeredSchools: number = 0;
  totalOrders: number = 0;
  grade5scholarship: number = 0;
  grade4scholarship: number = 0;
  grade3scholarship: number = 0;
  ordersToProcess: number = 0;

  constructor(private router: Router,
    private dashboardService: AdminDashboardService,
    private loginService: LoginService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(
      (userdata) => {
        console.log('User:', userdata);
        this.username = userdata.username; 
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

  trackQPPreparation() {
    this.router.navigate(['/features/scrumboard']);
  }
  
  registerSchools() {
    this.router.navigate(['/features/schoolRegistration']);
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

  logout() {
    this.loginService.logout();
  }
}
