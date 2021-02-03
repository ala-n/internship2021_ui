import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from '@shared/services/api.service';
import { MockApiService } from '@shared/services/mock-api.service';

import { OfferItemPageComponent } from './offer-item-page.component';

describe('OfferItemPageComponent', () => {
  let component: OfferItemPageComponent;
  let fixture: ComponentFixture<OfferItemPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfferItemPageComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: ApiService, useClass: MockApiService }]
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
