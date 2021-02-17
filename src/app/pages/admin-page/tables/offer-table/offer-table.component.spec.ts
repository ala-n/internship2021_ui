import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferTableComponent } from './offer-table.component';

describe('OfferTableComponent', () => {
  let component: OfferTableComponent;
  let fixture: ComponentFixture<OfferTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfferTableComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
