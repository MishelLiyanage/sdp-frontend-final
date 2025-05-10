import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueByPaymentMethodComponent } from './revenue-by-payment-method.component';

describe('RevenueByPaymentMethodComponent', () => {
  let component: RevenueByPaymentMethodComponent;
  let fixture: ComponentFixture<RevenueByPaymentMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevenueByPaymentMethodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevenueByPaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
