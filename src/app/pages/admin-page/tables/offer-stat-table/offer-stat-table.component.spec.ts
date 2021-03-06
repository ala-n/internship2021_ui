import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferStatTableComponent } from './offer-stat-table.component';

describe('OfferStatTableComponent', () => {
  let component: OfferStatTableComponent;
  let fixture: ComponentFixture<OfferStatTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfferStatTableComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferStatTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
