import { AfterViewInit, Component, OnInit } from '@angular/core';
import Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { PaymentRevenue, RevenueByPaymentMethodService } from '../../../../services/revenueByPaymentMethod.service';

@Component({
  selector: 'app-revenue-by-payment-method',
  imports: [HighchartsChartModule],
  templateUrl: './revenue-by-payment-method.component.html',
  styleUrl: './revenue-by-payment-method.component.scss'
})
export class RevenueByPaymentMethodComponent implements OnInit {
  revenueData: PaymentRevenue[] = [];

  constructor(private revenueService: RevenueByPaymentMethodService) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  loadData(): void {
    this.revenueService.getRevenueData().subscribe((data) => {
        this.revenueData = data;
        this.createChart();
    });
  }

  createChart(): void {
    const container = document.getElementById('revenue-chart-container');
    if (!container || this.revenueData.length === 0) return;

    const chartData = this.revenueData.map(item => ({
      name: item.method,
      y: item.amount
    }));

    Highcharts.chart(container, {
      chart: { type: 'pie' },
      title: { text: 'Revenue by Payment Method' },
      tooltip: {
        pointFormat: '<b>{point.percentage:.1f}%</b> ({point.y} LKR)'
      },
      plotOptions: {
        pie: {
          innerSize: '50%', // Donut effect
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.y} LKR'
          }
        }
      },
      series: [{
        name: 'Revenue',
        type: 'pie',
        data: chartData
      }]
    });
  }
}
