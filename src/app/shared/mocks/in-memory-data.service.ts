import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Vendor } from '../models/vendor';
import vendors from './vendors';
import offers from './offers';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  // eslint-disable-next-line  @typescript-eslint/explicit-module-boundary-types
  createDb() {
    return { vendors, offers };
  }

  // If the vendors array is empty,
  // the method below returns the initial number (1).
  // if the vendors array is not empty, the method below returns the highest
  // vendor id + 1.
  genId(vendors: Vendor[]): number {
    return vendors.length > 0
      ? Math.max(...vendors.map((vendor) => vendor.id)) + 1
      : 1;
  }
}
