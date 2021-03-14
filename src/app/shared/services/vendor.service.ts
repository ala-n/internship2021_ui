import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Vendor } from '@shared/models/vendor';
import { Office } from '@shared/models/office';
import { CityService } from './city.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  static VENDORS_URL = 'api/vendors';

  constructor(private http: HttpService, private cityService: CityService) {}

  getVendors(params?: { city: string }): Observable<Vendor[]> {
    // for mock
    // const url = VendorService.VENDORS_URL;
    // for back
    const url = `${VendorService.VENDORS_URL}/?includeInactive=true`;

    if (!params) return this.http.get<Vendor[]>(url);
    else {
      const cityId = this.cityService.getCityId(params.city);
      //for mock
      // return this.http.get<Vendor[]>(`${url}/?cityId=${cityId}`);
      // for backend
      return this.http.get<Vendor[]>(
        `${VendorService.VENDORS_URL}/city/${cityId}`
      );
    }
  }

  getVendorsAllAdmin(): Observable<Vendor> {
    const url = VendorService.VENDORS_URL;
    return this.http.get<Vendor>(url);
  }

  getVendorById(id: string): Observable<Vendor> {
    const url = `${VendorService.VENDORS_URL}/${id}/?includeEntities=true`;
    return this.http.get<Vendor>(url);
  }

  addVendor(vendor: Vendor): Observable<Vendor> {
    const url = VendorService.VENDORS_URL;
    return this.http.post<Vendor, Vendor>(url, vendor);
  }

  updateVendor(vendor: Vendor, vendorId: string): Observable<Vendor> {
    const url = `${VendorService.VENDORS_URL}/${vendorId}`;
    return this.http.put<Vendor, Vendor>(url, vendor);
  }

  addOffice(office: Office, vendorId: string): Observable<Office> {
    const url = `${VendorService.VENDORS_URL}/${vendorId}/vendorEntities`;
    office.vendorId = vendorId;
    return this.http.post<Office, Office>(url, office);
  }
}
