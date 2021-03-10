import { Injectable } from '@angular/core';
import { Tag } from '@shared/models/tag';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { share, tap } from 'rxjs/operators';
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
  private _topTags$: Observable<Tag[]> | null = null;

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

  getTagById(id: string): Observable<Tag> {
    return this.http.get(`${TagsService.TAGS_URL}/${id}`);
  }

  getTopTags(): Observable<Tag[]> {
    // return this.http.get(TagsService.TOP_TAGS_URL);
    if (!this._topTags$) {
      this._topTags$ = this.http
        .get<Tag[]>(`${TagsService.TAGS_URL}/topTags`)
        .pipe(share());
    }
    return this._topTags$;
  }

  addTag(tag: Record<string, unknown>): Subscription {
    const url = TagsService.TAGS_URL;
    return this.http.post<Tag>(url, tag).subscribe();
  }

  deleteTag(id: string): Subscription {
    const url = TagsService.TAGS_URL;
    return this.http.delete<Tag>(`${url}/${id}`).subscribe();
  }

  restoreTag(id: string): Subscription {
    const url = TagsService.TAGS_URL;
    return this.http.put<Tag>(`${url}/${id}`, {}).subscribe();
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
