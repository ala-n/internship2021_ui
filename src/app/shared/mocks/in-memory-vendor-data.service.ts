import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Vendor } from '../models/vendor';

@Injectable({
  providedIn: 'root'
})
export class InMemoryVendorDataService implements InMemoryDbService {
  // eslint-disable-next-line  @typescript-eslint/explicit-module-boundary-types
  createDb() {
    const vendors = [
      {
        id: 1,
        name: 'KFC',
        title: '',
        description: '',
        website: 'www.kfc.by',
        updated: '23.01.21',
        isActive: true
      },
      {
        id: 2,
        name: '24-fitness',
        title: '',
        description: '',
        website: 'www.fit24.by',
        updated: '22.01.21',
        isActive: true
      },
      {
        id: 3,
        name: 'BeautyBox',
        title: '',
        description: '',
        website: 'www.Bbox.by',
        updated: '24.01.21',
        isActive: true
      },
      {
        id: 4,
        name: 'Твой велик',
        title: '',
        description: '',
        website: 'www.twoj-velik.by',
        updated: '26.01.21',
        isActive: true
      },
      {
        id: 5,
        name: 'Wildberries',
        title: '',
        description: '',
        website: 'www.wildberries.com',
        updated: '26.01.21',
        isActive: true
      },
      {
        id: 6,
        name: '21vek',
        title: '',
        description: '',
        website: 'www.21vek.by',
        updated: '28.01.21',
        isActive: true
      }
    ];
    return { vendors };
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(vendors: Vendor[]): number {
    return vendors.length > 0
      ? Math.max(...vendors.map((vendor) => vendor.id)) + 1
      : 1;
  }
}
