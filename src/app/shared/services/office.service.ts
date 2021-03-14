import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Office } from '@shared/models/office';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {
  static OFFICES_URL = 'api/vendorEntities';

  constructor(private http: HttpService) {}

  getVendorOffices(vendorId: string, inactive?: boolean): Observable<Office[]> {
    // for back-end
    const url = `${OfficeService.OFFICES_URL}/vendor/${vendorId}`;
    if (inactive) {
      return this.http.get<Office[]>(`${url}/?includeInactive=true`);
    } else {
      return this.http.get<Office[]>(url);
    }

    // for mock
    // return this.http
    //   .get<Office[]>(OfficeService.OFFICES_URL)
    //   .pipe(
    //     map((offices) =>
    //       offices.filter(
    //         (office: { vendorId: string }) => office.vendorId === vendorId
    //       )
    //     )
    //   );
  }

  getOfficeById(id: string): Observable<Office> {
    const url = `${OfficeService.OFFICES_URL}/${id}`;
    return this.http.get(url);
  }

  updateOffice(office: Office): Observable<Office> {
    const url = `${OfficeService.OFFICES_URL}/${office.id}`;
    return this.http.put(url, office);
  }
}
