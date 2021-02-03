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

  stringData!: string[];

  filteredData!: Observable<string[]>;

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.filteredData = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    console.log(this.filteredData);
    this.getSearchData();
    this.stringData = this.data.map((object) => {
      return object.Data;
    });
  }

  getSearchData(): void {
    this.data = this.searchService.getSearchData();
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.stringData.filter((street: string) => {
      return this._normalizeValue(street).includes(filterValue);
    });
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}
