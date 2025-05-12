import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
import { MonthlyProcessedOrdersService, MonthlyOrdersData } from '../../../../services/MonthlyProcessedOrdersService.service';
import Highcharts from 'highcharts';

@Component({
  selector: 'app-monthly-processed-orders',
  imports: [HighchartsChartModule],
  templateUrl: './monthly-processed-orders.component.html',
  styleUrl: './monthly-processed-orders.component.scss'
})
export class MonthlyProcessedOrdersComponent implements OnInit, AfterViewInit {
  processedOrdersData: MonthlyOrdersData[] = [];

  constructor(private monthlyProcessedOrdersService: MonthlyProcessedOrdersService) {}

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {
    this.createChart();
  }

  loadData() {
    this.monthlyProcessedOrdersService.getProcessedOrders().subscribe((data) => {
      this.processedOrdersData = data;
      this.createChart();
    });
  }

  createChart() {
    const categories = this.processedOrdersData.map((d) => d.month);
    const orders = this.processedOrdersData.map((d) => d.orders);

    Highcharts.chart(document.getElementById('container') as HTMLElement, {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Orders Per Month'
      },
      subtitle: {
        text: ''
      },
      xAxis: {
        categories: categories,
        title: {
          text: 'Month'
        }
      },
      yAxis: {
        title: {
          text: 'Number of Orders'
        }
      },
      tooltip: {
        shared: true,
        valueSuffix: ' orders'
      },
      series: [{
        type: 'line',
        name: 'Processed Orders',
        data: orders
      }]
    });
  }

}
