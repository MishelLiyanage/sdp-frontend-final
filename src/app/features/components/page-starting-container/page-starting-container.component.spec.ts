import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageStartingContainerComponent } from './page-starting-container.component';

describe('PageStartingContainerComponent', () => {
  let component: PageStartingContainerComponent;
  let fixture: ComponentFixture<PageStartingContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageStartingContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageStartingContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
