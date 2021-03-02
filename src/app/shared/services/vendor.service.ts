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

  getVendors(params?: { city: string }): Observable<Vendor[]> {
    if (!params) return this.http.get<Vendor[]>(VendorService.VENDORS_URL);
    else
      return this.http.get<Vendor[]>(
        `${VendorService.VENDORS_URL}/?city=${params.city}`
      );
  }

  getVendorsAllAdmin(): Observable<Vendor> {
    const url = `${VendorService.VENDORS_URL}/allAdmin`;
    return this.http.get<Vendor>(url);
  }

  getVendorById(id: string): Observable<Vendor> {
    // const url = `${VendorService.VENDORS_URL}/get/${id}`;
    const url = `${VendorService.VENDORS_URL}/${id}`;
    return this.http.get<Vendor>(url);
  }

  addVendor(vendor: Vendor): Observable<Vendor> {
    // const url = `${VendorService.VENDORS_URL}/add`;
    const url = VendorService.VENDORS_URL;
    return this.http.post<Vendor>(url, vendor, this.httpOptions);
  }

  updateVendor(vendor: Vendor, vendorId: string): Observable<Vendor> {
    console.log(vendor, vendorId);
    const url = `${VendorService.VENDORS_URL}/${vendorId}`;
    return this.http.put<Vendor>(url, vendor, this.httpOptions);
  }
}
