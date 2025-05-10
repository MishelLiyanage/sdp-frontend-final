import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCategoryDistributionComponent } from './order-category-distribution.component';

describe('OrderCategoryDistributionComponent', () => {
  let component: OrderCategoryDistributionComponent;
  let fixture: ComponentFixture<OrderCategoryDistributionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderCategoryDistributionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderCategoryDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
