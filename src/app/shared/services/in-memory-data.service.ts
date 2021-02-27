import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import vendors from '../mocks/vendors';
import offers from '../mocks/offers';
import cities from '../mocks/cities';
import offices from '../mocks/offices';
import searchData from '../mocks/mock-search-data';
import tags from '../mocks/mock-tags';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  // eslint-disable-next-line  @typescript-eslint/explicit-module-boundary-types
  createDb() {
    return { vendors, offers, cities, offices, searchData, tags };
  }
}
