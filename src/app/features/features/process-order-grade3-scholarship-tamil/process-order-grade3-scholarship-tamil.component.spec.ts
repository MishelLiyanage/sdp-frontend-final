import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessOrderGrade3ScholarshipTamilComponent } from './process-order-grade3-scholarship-tamil.component';

describe('ProcessOrderGrade3ScholarshipTamilComponent', () => {
  let component: ProcessOrderGrade3ScholarshipTamilComponent;
  let fixture: ComponentFixture<ProcessOrderGrade3ScholarshipTamilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessOrderGrade3ScholarshipTamilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessOrderGrade3ScholarshipTamilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
