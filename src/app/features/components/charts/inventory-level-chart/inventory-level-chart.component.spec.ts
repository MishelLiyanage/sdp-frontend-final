import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryLevelChartComponent } from './inventory-level-chart.component';

describe('InventoryLevelChartComponent', () => {
  let component: InventoryLevelChartComponent;
  let fixture: ComponentFixture<InventoryLevelChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryLevelChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryLevelChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
