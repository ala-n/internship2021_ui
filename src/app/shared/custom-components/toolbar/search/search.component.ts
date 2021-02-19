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

  data!: SearchData[]; // Array of object, that contains a string data

  stringData!: string[]; // Array of string, that was made from data

  filteredData!: Observable<string[]>; // Array of filtred data, that application
  // show user when he enter data
  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
  
  this.searchService.getSearchData().subscribe((data: SearchData[]) => this.parseSearchData(data));
  
  }

  parseSearchData(data: SearchData[]): void {
    this.data = data;
    this.stringData = this.fromArrayToString(data);
    this.changeValue();
  }

  //This function make from objects array to strings array
  fromArrayToString(data: Object): string[] {
    return this.data.map((object) => {
      return object.data;
    });
  }

  // This function change value according to your input value
  changeValue(): void{
    this.filteredData = this.control.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
}

  // This function fiter data in search, according to your you input
  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.stringData.filter((street: string) => {
      return this._normalizeValue(street).includes(filterValue);
    });
  }
  // This function make all Text to lowercase
  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}
