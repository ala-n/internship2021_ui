import { Injectable } from '@angular/core';
import { Offer } from '@shared/models/offer';
import { BehaviorSubject } from 'rxjs';
import { OfferService } from './offer.service';

interface FilterConfig {
  city?: string;
  tag?: string;
  office?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private _filteredOfferList$ = new BehaviorSubject<Offer[]>([]);
  readonly filteredOfferList$ = this._filteredOfferList$.asObservable();
  public list$: BehaviorSubject<Offer[]> = new BehaviorSubject<Offer[]>([]);
  public filterCfg: FilterConfig = {};
  private listUpdateTimeout = 0;

  constructor(private offerService: OfferService) {}

  filter(cfg: Partial<FilterConfig>): void {
    this.filterCfg = { ...this.filterCfg, ...cfg };
    this.updateList();
  }
  private applyFilter(offers: Offer[]) {
    return offers.filter((offer) => {
      if (this.filterCfg.tag && !offer.tags.includes(this.filterCfg.tag))
        return false;
      if (this.filterCfg.office?.length) {
        const officesId = offer.offices.map((o) => o.id);
        if (!this.isIntersects(this.filterCfg.office, officesId)) return false;
      }
      return true;
    });
  }

  private updateList(): void {
    if (this.listUpdateTimeout) clearTimeout(this.listUpdateTimeout);
    setTimeout(() => {
      this.offerService
        .getOffers(this.filterCfg as { city: string })
        .subscribe((offers: Offer[]) =>
          this.list$.next(this.applyFilter(offers))
        );
    }, 50);
  }
  isIntersects<T>(list: T[], list2: T[]) {
    return list.some((item) => list2.includes(item));
  }
}
