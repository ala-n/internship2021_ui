import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

import { Tag } from '@shared/models/tag';
import { TagsService } from '@shared/services/tags.service';
import { FilterService } from '@shared/services/filter.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {
  control = new FormControl();

  data!: Tag[]; // Array of object, that contains a string data

  stringData!: string[]; // Array of string, that was made from data

  filteredData!: Observable<string[]>; // Array of filtred data, that application

  // show user when he enter data
  constructor(
    private tagsService: TagsService,
    private filterService: FilterService
  ) {}

  searchBy(): void {
    const tag = this.control.value.trim().toLowerCase();
    const tagId = this.tagsService.getTagId(tag);
    if (tagId) {
      this.control.setValue(tag);
      this.filterService.filterByTags(tagId);
    } else {
      this.filterService.filterByText(this.control.value);
    }
    this.control.setValue('');
  }

  ngOnInit(): void {
    this.control.setValue('');
    this.tagsService.getTagsValue().subscribe((data: Tag[]) => {
      this.parseSearchData(data);
    });
  }

  parseSearchData(data: Tag[]): void {
    this.data = data;
    this.stringData = this.fromArrayToString();
    this.changeValue();
  }

  // This function make from objects array to strings array
  fromArrayToString(): string[] {
    return this.data.map((object) => {
      return object.name;
    });
  }

  // This function change value according to your input value
  changeValue(): void {
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
