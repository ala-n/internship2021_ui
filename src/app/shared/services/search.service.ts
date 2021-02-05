import { Injectable } from '@angular/core';

import { SEARCH_DATA } from '../mocks/mock-search-data';
import { SearchData } from '../models/search-data';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  getSearchData(): SearchData[] {
    return SEARCH_DATA;
  }
}
