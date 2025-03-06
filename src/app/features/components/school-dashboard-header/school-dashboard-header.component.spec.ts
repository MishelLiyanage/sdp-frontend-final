import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolDashboardHeaderComponent } from './school-dashboard-header.component';

describe('SchoolDashboardHeaderComponent', () => {
  let component: SchoolDashboardHeaderComponent;
  let fixture: ComponentFixture<SchoolDashboardHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolDashboardHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolDashboardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
