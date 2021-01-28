import { Component, OnInit } from '@angular/core';

import { SortValue } from '../../../shared/models/sort-value';
import { ValuesSortByService } from '../../../shared/services/sort-by.service';

@Component({
  selector: 'app-sort-by',
  templateUrl: './sort-by.component.html',
  styleUrls: ['./sort-by.component.scss']
})
export class SortByComponent implements OnInit {

  sortValues!: SortValue[];

  constructor(private sortByService: ValuesSortByService) {}

  getValues(): void {
    this.sortValues = this.sortByService.getOffers();
  }
  
  ngOnInit(): void {
    this.getValues();
  }
}
