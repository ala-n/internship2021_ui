import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchData } from '../models/search-data';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  static SEARCH_URL = 'api/searchData';

  constructor(private http: HttpService) {}

  getSearchData(): Observable<SearchData[]> {
    return this.http.get(SearchService.SEARCH_URL);
  }
}
