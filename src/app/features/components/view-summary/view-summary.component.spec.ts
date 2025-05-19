import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSummaryComponent } from './view-summary.component';

describe('ViewSummaryComponent', () => {
  let component: ViewSummaryComponent;
  let fixture: ComponentFixture<ViewSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
