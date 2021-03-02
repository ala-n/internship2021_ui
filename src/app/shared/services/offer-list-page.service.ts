import { Injectable } from '@angular/core';
import { Offer } from '@shared/models/offer';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfferListPageService {
  baseOfferList$!: Observable<Offer[]>;
  private _filteredOfferList$ = new BehaviorSubject<Offer[]>([]);
  readonly filteredOfferList$ = this._filteredOfferList$.asObservable();

  filterOfferList(offices: string[]): void {
    this.baseOfferList$.subscribe((offers: Offer[]) => {
      this._filteredOfferList$.next(
        offers.filter((offer) => {
          return offer.officesId.some((office) => offices.indexOf(office) >= 0);
        })
      );
    });
  }
}
