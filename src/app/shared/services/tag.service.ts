import { Injectable } from '@angular/core';

import { TAGS } from '../mocks/mock-tags';
import { Tags } from '../models/tags';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  getTagsValue(): Tags[] {
    return TAGS;
  }
}
