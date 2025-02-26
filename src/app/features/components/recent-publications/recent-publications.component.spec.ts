import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentPublicationsComponent } from './recent-publications.component';

describe('RecentPublicationsComponent', () => {
  let component: RecentPublicationsComponent;
  let fixture: ComponentFixture<RecentPublicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentPublicationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentPublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
