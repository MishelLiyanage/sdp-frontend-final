import { Component, OnInit } from '@angular/core';
import Highcharts from 'highcharts';
import { MonthlyRevenue, RevenueTrendService } from '../../../../services/revenueTrend.service';

@Component({
  selector: 'app-revenue-trand',
  imports: [],
  templateUrl: './revenue-trand.component.html',
  styleUrl: './revenue-trand.component.scss'
})
export class RevenueTrandComponent implements OnInit {
  revenueData: MonthlyRevenue[] = [];

  constructor(private revenueService: RevenueTrendService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.revenueService.getMonthlyRevenue().subscribe((data) => {
      this.revenueData = data;
      this.createChart();
    });
  }

  createChart(): void {
    const container = document.getElementById('revenue-trend-chart-container');
    if (!container || this.revenueData.length === 0) return;

    Highcharts.chart(container, {
      chart: {
        type: 'line'
      },
      title: {
        text: 'Revenue Trend (Monthly)'
      },
      xAxis: {
        categories: this.revenueData.map(item => item.month),
        title: { text: 'Month' }
      },
      yAxis: {
        title: { text: 'Revenue (LKR)' }
      },
      tooltip: {
        pointFormat: 'Revenue: <b>{point.y} LKR</b>'
      },
      series: [{
        name: 'Revenue',
        type: 'line',
        data: this.revenueData.map(item => item.amount)
      }]
    });
  }
}