import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Office } from '@shared/models/office';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {
  static OFFICES_URL = 'api/vendorEntities';

  constructor(private http: HttpService) {}

  getVendorOffices(vendorId: string): Observable<Office[]> {
    // for back-end
    // const url = `${OfficeService.OFFICES_URL}/vendor/${vendorId}/?includeInactive=true`;
    // return this.http.get<Office[]>(url);

    // for mock
    return this.http
      .get<Office[]>(OfficeService.OFFICES_URL)
      .pipe(
        map((offices) =>
          offices.filter(
            (office: { vendorId: string }) => office.vendorId === vendorId
          )
        )
      );
  }

  getOfficeById(id: string): Observable<Office> {
    const url = `${OfficeService.OFFICES_URL}/${id}`;
    return this.http.get(url);
  }

  getOfficesById(arr: string[]): Observable<Office[]> {
    const url = `${OfficeService.OFFICES_URL}/${arr}`;
    return this.http.get<Office[]>(url);
  }

  // addOffice(office: Office, vendorId: string): Observable<Office> {
  //   const url = OfficeService.OFFICES_URL;
  //   office.vendorId = vendorId;
  //   return this.http.post(url, office);
  // }

  updateOffice(office: Office): Subscription {
    const url = `${OfficeService.OFFICES_URL}/${office.id}`;
    return this.http.put(url, office).subscribe();
  }
}
