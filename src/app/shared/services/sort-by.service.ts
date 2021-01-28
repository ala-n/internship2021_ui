import { Injectable } from '@angular/core';

import { SORTVALUES } from '../mock-sort-by';
import { SortValue } from '../models/sort-value';

@Injectable({
  providedIn: 'root'
})
export class ValuesSortByService {

  getOffers(): SortValue[] {
    return SORTVALUES;
  }
  
}
