import { Component, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Offer } from '@shared/models/offer';
import { EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { MapService } from '@shared/services/map.service';

type OfferWithDistance = {
  offer: Offer;
  distance: number;
};

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortByComponent {
  readonly SORT_OPTIONS = ['recency', 'distance', 'rating'];
  readonly sortControl = new FormControl(this.SORT_OPTIONS[0]);

  @Input() offerList$!: Observable<Offer[]>;
  @Output() offerList$Change: EventEmitter<
    Observable<Offer[]>
  > = new EventEmitter<Observable<Offer[]>>();
  offers!: Offer[];
  selected!: string;

  constructor(private mapService: MapService) {}

  ngOnInit() {
    this.onSelect();
  }

  onSelect(): void {
    this.selected = this.sortControl.value;
    let result: Offer[] = [];

    this.offerList$.pipe(take(1)).subscribe((offers) => {
      this.offers = offers;
    });

    if (!this.offers) return;

    switch (this.selected) {
      case 'distance':
        result = this.sortByDistance(
          this.offers,
          this.mapService.distanceToMarkers
        );
        break;
      case 'recency':
        result = this.sortByRecency(this.offers);
        break;
      case 'rating':
        result = this.sortByRating(this.offers);
        break;
      default:
        result = this.offers;
        break;
    }

    this.offerList$Change.emit(of(result));
  }

  sortByRecency(offers: Offer[]): Offer[] {
    return offers.sort((a, b) => {
      const dateA = new Date(a.updated).getTime();
      const dateB = new Date(b.updated).getTime();
      return dateB - dateA;
    });
  }

  sortByRating(offers: Offer[]): Offer[] {
    return offers.sort((a, b) => b.rating - a.rating);
  }

  sortByDistance(
    offers: Offer[],
    distanceToMarkers: Map<string, number>
  ): Offer[] {
    if (!this.mapService.distanceToMarkers) return offers;
    const offerWithDistance: OfferWithDistance[] = offers.map((offer) => {
      const distances: number[] = offer.officesId.map(
        (id) => distanceToMarkers.get(id) || Number.POSITIVE_INFINITY
      );
      const distance = Math.min.apply(null, distances);
      return { offer, distance };
    });

    offerWithDistance.sort((a, b) => a.distance - b.distance);
    return offerWithDistance.map(({ offer }) => offer);
  }
}
