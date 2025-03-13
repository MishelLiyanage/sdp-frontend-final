import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSchoolsComponent } from './manage-schools.component';

describe('ManageSchoolsComponent', () => {
  let component: ManageSchoolsComponent;
  let fixture: ComponentFixture<ManageSchoolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageSchoolsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSchoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
