import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { VendorService } from './vendor.service';

describe('VendorService', () => {
  let service: VendorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(VendorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
