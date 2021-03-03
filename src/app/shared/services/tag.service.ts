import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Tag } from '../models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  static TAGS_URL = 'api/topTags';

  constructor(private http: HttpClient) {}

  getTagsValue(): Observable<Tag[]> {
    return this.http.get<Tag[]>(TagsService.TAGS_URL);
  }
}
