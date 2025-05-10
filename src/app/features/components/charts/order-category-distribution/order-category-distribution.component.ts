import { AfterViewInit, Component, OnInit } from '@angular/core';
import Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { OrderCategoryData, OrderCategoryDistribution } from '../../../../services/orderCategoryDistribution.service';

@Component({
  selector: 'app-order-category-distribution',
  imports: [HighchartsChartModule],
  templateUrl: './order-category-distribution.component.html',
  styleUrl: './order-category-distribution.component.scss'
})
export class OrderCategoryDistributionComponent implements OnInit, AfterViewInit {
  distributionData: OrderCategoryData[] = [];

  constructor(private orderCategoryDistributionService: OrderCategoryDistribution) { }

  ngOnInit(): void {
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  loadData(): void {
    this.orderCategoryDistributionService.getOrderDistribution().subscribe((data) => {
      console.log('Order Category Distribution Data:', data); // Debugging line to check the data
      this.distributionData = data;
      this.createChart();
    });
  }

  createChart(): void {
    const container = document.getElementById('order-category-distribution-container');
    if (!container || this.distributionData.length === 0) return;

    const pieData = this.distributionData.map(d => ({
      name: d.category,
      y: d.percentage
    }));

    Highcharts.chart(container, {
      chart: { type: 'pie' },
      title: { text: 'Order Distribution by Grade / Category' },
      tooltip: { pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>' },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        type: 'pie',
        name: 'Orders',
        data: pieData
      }]
    });
  }
}