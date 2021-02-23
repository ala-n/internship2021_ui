import { Injectable } from '@angular/core';

import { TAGS } from '../mocks/mock-tags';
import { Tag } from '../models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  getTagsValue(): Tag[] {
    return TAGS;
  }
}
