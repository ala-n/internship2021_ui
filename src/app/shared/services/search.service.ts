import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tag } from '../models/tag';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  static SEARCH_URL = 'api/tags';

  constructor(private http: HttpService) {}

  getSearchData(): Observable<Tag[]> {
    return this.http.get<Tag[]>(SearchService.SEARCH_URL);
  }
}
