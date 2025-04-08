import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePrintingProgressComponent } from './update-printing-progress.component';

describe('UpdatePrintingProgressComponent', () => {
  let component: UpdatePrintingProgressComponent;
  let fixture: ComponentFixture<UpdatePrintingProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePrintingProgressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePrintingProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
