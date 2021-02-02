import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferItemPageComponent } from './offer-item-page.component';

describe('OfferItemPageComponent', () => {
  let component: OfferItemPageComponent;
  let fixture: ComponentFixture<OfferItemPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfferItemPageComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferItemPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
