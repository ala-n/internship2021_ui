import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Vendor } from '@shared/models/vendor';
import { Office } from '@shared/models/office';
import { CityService } from './city.service';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  static VENDORS_URL = 'api/vendors';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private cityService: CityService) {}

  getVendors(params?: { city: string }): Observable<Vendor[]> {
    // for mock
    const url = VendorService.VENDORS_URL;
    // for back
    // const url = `${VendorService.VENDORS_URL}/?includeInactive=true`;

    if (!params) return this.http.get<Vendor[]>(url);
    else {
      const cityId = this.cityService.getCityId(params.city);
      //for mock
      return this.http.get<Vendor[]>(`${url}/?cityId=${cityId}`);
      // for backend
      // return this.http.get<Vendor[]>(
      //   `${VendorService.VENDORS_URL}/city/${cityId}`
      // );
    }
  }

  getVendorsAllAdmin(): Observable<Vendor> {
    const url = VendorService.VENDORS_URL;
    return this.http.get<Vendor>(url);
  }

  getVendorById(id: string): Observable<Vendor> {
    const url = `${VendorService.VENDORS_URL}/${id}`;
    return this.http.get<Vendor>(url);
  }

  addVendor(vendor: Vendor): Subscription {
    const url = VendorService.VENDORS_URL;
    return this.http.post<Vendor>(url, vendor, this.httpOptions).subscribe();
  }

  updateVendor(vendor: Vendor, vendorId: string): Subscription {
    const url = `${VendorService.VENDORS_URL}/${vendorId}`;
    return this.http.put<Vendor>(url, vendor, this.httpOptions).subscribe();
  }

  addOffice(office: Office, vendorId: string): Subscription {
    const url = `${VendorService.VENDORS_URL}/${vendorId}/vendorEntities`;
    office.vendorId = vendorId;
    return this.http.post<Office>(url, office).subscribe();
  }
}
