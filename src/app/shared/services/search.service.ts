import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchData } from '../models/search-data';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  static SEARCH_URL = 'api/searchData';

  constructor(private http: HttpClient) {}

  getSearchData(): Observable<SearchData[]> {
    return this.http.get<SearchData[]>(SearchService.SEARCH_URL);
  }
}
