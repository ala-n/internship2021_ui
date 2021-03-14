import { TestBed } from '@angular/core/testing';

import { HistoryOfferService } from './history-offer.service';

describe('HistoryOfferService', () => {
  let service: HistoryOfferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryOfferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
