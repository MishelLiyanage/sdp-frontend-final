import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessOrderNavigatorComponent } from './process-order-navigator.component';

describe('ProcessOrderNavigatorComponent', () => {
  let component: ProcessOrderNavigatorComponent;
  let fixture: ComponentFixture<ProcessOrderNavigatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessOrderNavigatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessOrderNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
