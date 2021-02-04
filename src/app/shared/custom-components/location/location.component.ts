import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapService } from '@shared/services/map.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LocationComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = [
    'Moscow',
    'Kyiv',
    'Tashkent',
    'Moscow',
    'Kyiv',
    'Tashkent',
    'Moscow',
    'Kyiv',
    'Tashkent',
    'Moscow',
    'Kyiv',
    'Tashkent'
  ];
  filteredOptions!: Observable<string[]>;
  defaultCity = 'Minsk';

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    this.onClick(this.defaultCity);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(
      (option) => option.toLowerCase().indexOf(filterValue) === 0
    );
  }

  onClick(event: string) {
    this.mapService.setCity(event);
  }

  focusOut() {
    if (!this.myControl.value) {
      this.onClick(this.defaultCity);
    }
  }
}
