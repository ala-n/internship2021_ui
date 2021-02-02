import { Injectable } from '@angular/core';

import { SEARCHDATA } from '../mocks/mock-search-data';
import { SearchData } from '../models/search-data';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  getSearchData(): SearchData[] {
    return SEARCHDATA;
  }
}
