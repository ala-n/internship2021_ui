import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Tag } from '../models/tag';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  static SEARCH_URL = 'api/tags';

  constructor(private http: HttpClient) {}

  getSearchData(): Observable<Tag[]> {
    return this.http.get<Tag[]>(SearchService.SEARCH_URL);
  }
}
