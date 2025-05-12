import { Component, OnInit } from '@angular/core';
import Highcharts from 'highcharts';
import { InventoryItem, InventoryLevelService } from '../../../../services/inventoryLevel.service';

@Component({
  selector: 'app-inventory-level-chart',
  imports: [],
  templateUrl: './inventory-level-chart.component.html',
  styleUrl: './inventory-level-chart.component.scss'
})
export class InventoryLevelChartComponent implements OnInit {
  inventoryData: InventoryItem[] = [];
  threshold = 50;

  constructor(private inventoryService: InventoryLevelService) {}

  ngOnInit(): void {
    this.loadInventoryData();
  }

  loadInventoryData(): void {
    this.inventoryService.getInventoryLevels().subscribe((data) => {
      console.log("inventory levels:", data);
      this.inventoryData = data;
      this.createChart();
    });
  }

  createChart(): void {
    const container = document.getElementById('inventory-level-chart-container');
    if (!container || this.inventoryData.length === 0) return;

    const categories = this.inventoryData.map(item => item.modelPaperName);
    const data = this.inventoryData.map(item => ({
      name: item.modelPaperName,
      y: item.quantity,
      color: item.quantity < this.threshold ? 'red' : '#2f7ed8'
    }));

    Highcharts.chart(container, {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Inventory Levels of Model Papers'
      },
      xAxis: {
        categories: categories,
        title: { text: 'Model Papers' }
      },
      yAxis: {
        min: 0,
        title: { text: 'Stock Level' }
      },
      legend: { enabled: false },
      series: [{
        name: 'Stock',
        type: 'bar',
        data: data
      }]
    });
  }
}