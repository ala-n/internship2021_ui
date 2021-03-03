import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Tag } from '../models/tag';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  static TAGS_URL = 'api/tags';

  constructor(private http: HttpService) {}

  getTagsValue(): Observable<Tag[]> {
    return this.http.get(TagsService.TAGS_URL);
  }
}
