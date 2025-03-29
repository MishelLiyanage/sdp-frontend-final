import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyProcessedOrdersComponent } from './monthly-processed-orders.component';

describe('MonthlyProcessedOrdersComponent', () => {
  let component: MonthlyProcessedOrdersComponent;
  let fixture: ComponentFixture<MonthlyProcessedOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyProcessedOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyProcessedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
