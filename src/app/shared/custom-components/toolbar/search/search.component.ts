import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  control = new FormControl();
  streets: string[] = [
    'Mc Donalds',
    'Food',
    'Sport',
    'Clothes',
    'Entertaiment',
    'Beauty',
    'Home',
    'Electronic',
    'Hotels',
    'Markets',
    'Pharmacy',
    'KFC',
    'Addidas',
    'NIKE',
    'Puma',
    'Avingo',
    'Pizza',
    'Sushi',
    'Ice-cream',
    'Fast-food',
    'Trousers',
    'Shirt',
    'T-shirt',
    'Soccer',
    'Football',
    'Ball',
    'Wolf',
    'Bowling',
    'Cinema',
    'Basketball',
    'Tennis',
    'Summer',
    'Winter',
    'Holiday',
    'Beach',
    'Sea',
    'Meat',
    'Vegeterian',
    'Milk',
    'Supermarket',
    'Premium',
    'Big discount',
    'Black friday',
    'New Year',
    'Christmas',
    'IT',
    'Medical',
    'Pills'
    ];
  filteredStreets!: Observable<string[]>;

  ngOnInit() {
    this.filteredStreets = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.streets.filter(street => this._normalizeValue(street).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}