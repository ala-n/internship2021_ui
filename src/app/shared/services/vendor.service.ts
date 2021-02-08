import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Vendor } from '@shared/models/vendor';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  static VENDORS_URL = 'api/vendors';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getVendors(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(VendorService.VENDORS_URL);
  }

  getVendor(id: number): Observable<Vendor> {
    const url = `${VendorService.VENDORS_URL}/${id}`;
    return this.http.get<Vendor>(url);
  }

  addVendor(vendor: Vendor): Observable<Vendor> {
    return this.http.post<Vendor>(
      VendorService.VENDORS_URL,
      vendor,
      this.httpOptions
    );
  }

  updateVendor(vendor: Vendor): Observable<Vendor> {
    return this.http.put<Vendor>(
      VendorService.VENDORS_URL,
      vendor,
      this.httpOptions
    );
  }
}
