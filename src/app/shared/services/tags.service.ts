import { Injectable } from '@angular/core';
import { Tag } from '@shared/models/tag';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  // static TOP_TAGS_URL = 'api/tags/topTags';
  static TAGS_URL = 'api/tags';

  private _tag$ = new BehaviorSubject<string>('');
  public tag$ = this._tag$.asObservable();
  private _tags: Tag[] = [];

  constructor(private http: HttpService) {}

  getAllTags(): Observable<Tag[]> {
    return this.http
      .get<Tag[]>(TagsService.TAGS_URL)
      .pipe(
        tap(
          (tags) => (
            (this._tags = [...tags]),
            this._tags.forEach((tag) => (tag.name = tag.name.toLowerCase()))
          )
        )
      );
  }

  getTagsValue(): Observable<Tag[]> {
    // return this.http.get(TagsService.TOP_TAGS_URL);
    return this.http.get(`${TagsService.TAGS_URL}/topTags`);
  }

  getTagsForAdmin(): Observable<Tag[]> {
    return this.http.get(`${TagsService.TAGS_URL}/statistics`);
  }

  setTag(tag: string): void {
    this._tag$.next(tag);
  }

  get tags(): Tag[] {
    return this._tags;
  }

  getTagId(tagName: string | undefined): string {
    if (!tagName) return '';

    const tag = this.tags.find((tag) => tag.name === tagName);
    return tag ? tag.id : '';
  }

  getTagName(tagId: string | undefined): string {
    if (!tagId) return '';

    const tag = this.tags.find((tag) => tag.id === tagId);
    return tag ? tag.name : '';
  }
}
