import { TestBed } from '@angular/core/testing';

import { OfferListPageService } from './offer-list-page.service';

describe('OfferListPageService', () => {
  let service: OfferListPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfferListPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
