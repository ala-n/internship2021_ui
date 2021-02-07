import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapService } from '@shared/services/map.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ['Minsk', 'Grodno', 'Kyiv', 'Yekaterinburg'];
  filteredOptions!: Observable<string[]>;
  defaultCity = 'Minsk';

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    this.mapService.setCity(this.defaultCity);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.toLowerCase().startsWith(filterValue)
    );
  }

  onSelectionChanged(option: string): void {
    this.mapService.setCity(option);
  }
}
