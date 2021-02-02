import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { SearchData } from 'src/app/shared/models/search-data';
import { SearchService } from 'src/app/shared/services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  control = new FormControl();

  data!: SearchData[];
  streets: any;

  constructor(private searchService: SearchService) {}

  filteredTags!: Observable<string[]>;

  ngOnInit() {
    this.filteredTags = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    this.getSearchData();
  }

  getSearchData(): void {
    this.data = this.searchService.getSearchData();
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.streets.filter((street: string) =>
      this._normalizeValue(street).includes(filterValue)
    );
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}
