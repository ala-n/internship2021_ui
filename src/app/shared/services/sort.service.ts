import { Injectable } from '@angular/core';
import { Offer } from '@shared/models/offer';
import { BehaviorSubject } from 'rxjs';
import { MapService } from './map.service';

type OfferWithDistance = {
  offer: Offer;
  distance: number;
};

@Injectable({
  providedIn: 'root'
})
export class SortService {
  parameter$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private mapService: MapService) {}

  sortOfferList(parameter: string, list: Offer[]): Offer[] {
    let result: Offer[] = [];
    switch (parameter) {
      case 'distance':
        result = this.sortByDistance(list, this.mapService.distanceToMarkers);
        break;
      case 'recency':
        result = this.sortByRecency(list);
        break;
      case 'rating':
        result = this.sortByRating(list);
        break;
      default:
        result = list;
        break;
    }
    return result;
  }

  setParameter(parameter: string): void {
    this.parameter$.next(parameter);
  }

  sortByRecency(offers: Offer[]): Offer[] {
    return offers.sort((a, b) => {
      const dateA = new Date(a.updatedAt).getTime();
      const dateB = new Date(b.updatedAt).getTime();
      return dateB - dateA;
    });
  }

  sortByRating(offers: Offer[]): Offer[] {
    return offers.sort((a, b) => b.rate - a.rate);
  }

  sortByDistance(
    offers: Offer[],
    distanceToMarkers: Map<string, number>
  ): Offer[] {
    if (!this.mapService.distanceToMarkers) return offers;
    const offerWithDistance: OfferWithDistance[] = offers.map((offer) => {
      const distances: number[] = offer.vendorEntitiesId.map(
        (id) => distanceToMarkers.get(id) || Number.POSITIVE_INFINITY
      );
      const distance = Math.min.apply(null, distances);
      return { offer, distance };
    });

    offerWithDistance.sort((a, b) => a.distance - b.distance);
    return offerWithDistance.map(({ offer }) => offer);
  }
}
