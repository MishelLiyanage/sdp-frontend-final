import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageStartingContainerComponent } from "../../components/page-starting-container/page-starting-container.component";
// Angular Chart Component
import { AgCharts } from 'ag-charts-angular';
// Chart Options Type Interface
import { AgChartOptions } from 'ag-charts-community';
import { MonthlyProcessedOrdersComponent } from "../../components/charts/monthly-processed-orders/monthly-processed-orders.component";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    PageStartingContainerComponent,
    AgCharts,
    MonthlyProcessedOrdersComponent
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

  public chartOptions: AgChartOptions;
  constructor() {
    this.chartOptions = {
      // Data: Data to be displayed in the chart
      data: [
        { month: 'Jan', avgTemp: 2.3, iceCreamSales: 162000 },
        { month: 'Mar', avgTemp: 6.3, iceCreamSales: 302000 },
        { month: 'May', avgTemp: 16.2, iceCreamSales: 800000 },
        { month: 'Jul', avgTemp: 22.8, iceCreamSales: 1254000 },
        { month: 'Sep', avgTemp: 14.5, iceCreamSales: 950000 },
        { month: 'Nov', avgTemp: 8.9, iceCreamSales: 200000 },
      ],
      // Series: Defines which chart type and data to use
      series: [{ type: 'bar', xKey: 'month', yKey: 'iceCreamSales' }]
    };
  }
}
