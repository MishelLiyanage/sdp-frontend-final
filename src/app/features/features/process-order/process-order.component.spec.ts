import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessOrderComponent } from './process-order.component';

describe('ProcessOrderComponent', () => {
  let component: ProcessOrderComponent;
  let fixture: ComponentFixture<ProcessOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
