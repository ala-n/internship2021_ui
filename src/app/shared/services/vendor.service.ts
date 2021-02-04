import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vendor } from '@shared/models/vendor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private vendorsUrl = 'api/vendors';

  // httpOptions = {
  //   headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  // };

  constructor(private http: HttpClient) {}

  getVendors(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.vendorsUrl);
  }
}
