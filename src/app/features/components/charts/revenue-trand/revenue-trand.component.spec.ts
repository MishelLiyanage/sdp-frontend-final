import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueTrandComponent } from './revenue-trand.component';

describe('RevenueTrandComponent', () => {
  let component: RevenueTrandComponent;
  let fixture: ComponentFixture<RevenueTrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevenueTrandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevenueTrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
