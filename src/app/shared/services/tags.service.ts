import { Injectable } from '@angular/core';
import { Tag } from '@shared/models/tag';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  static TOP_TAGS_URL = 'api/topTags';
  // static TOP_TAGS_URL = 'api/tags/topTags';
  static TAGS_URL = 'api/tags';

  private _tag$ = new BehaviorSubject<string>('');
  public tag$ = this._tag$.asObservable();

  constructor(private http: HttpService) {}

  getAllTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(TagsService.TAGS_URL);
  }

  getTagsValue(): Observable<Tag[]> {
    // return this.http.get(TagsService.TOP_TAGS_URL);
    return this.http.get(TagsService.TOP_TAGS_URL);
  }

  setTag(tag: string): void {
    this._tag$.next(tag);
  }
}
