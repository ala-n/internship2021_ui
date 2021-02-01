import { TAGS } from '../mocks/mock-tags';
import { Tags } from '../models/tags';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  export class SearchService {
    getTags(): Tags[] {
      return TAGS;
    }
}
