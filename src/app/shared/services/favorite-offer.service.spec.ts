import { TestBed } from '@angular/core/testing';

import { FavoriteOfferService } from './favorite-offer.service';

describe('FavoriteOfferService', () => {
  let service: FavoriteOfferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteOfferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
