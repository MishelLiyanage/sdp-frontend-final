import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateParcelListComponent } from './generate-parcel-list.component';

describe('GenerateParcelListComponent', () => {
  let component: GenerateParcelListComponent;
  let fixture: ComponentFixture<GenerateParcelListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateParcelListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateParcelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
