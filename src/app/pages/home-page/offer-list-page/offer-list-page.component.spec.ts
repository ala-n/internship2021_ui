import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from '@shared/services/api.service';
import { MockApiService } from '@shared/services/mock-api.service';

import { OfferListPageComponent } from './offer-list-page.component';

describe('OfferListPageComponent', () => {
  let component: OfferListPageComponent;
  let fixture: ComponentFixture<OfferListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OfferListPageComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: ApiService, useClass: MockApiService }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
