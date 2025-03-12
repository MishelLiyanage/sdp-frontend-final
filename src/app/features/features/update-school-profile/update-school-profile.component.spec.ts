import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSchoolProfileComponent } from './update-school-profile.component';

describe('UpdateSchoolProfileComponent', () => {
  let component: UpdateSchoolProfileComponent;
  let fixture: ComponentFixture<UpdateSchoolProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateSchoolProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateSchoolProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
