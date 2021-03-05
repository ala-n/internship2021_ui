import { Injectable } from '@angular/core';
import { Offer } from '@shared/models/offer';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { OfferService } from './offer.service';
import { SortService } from './sort.service';

interface FilterConfig {
  city?: string;
  tag?: string;
  office?: string[];
}

// interface OffersData {
//   offers?: Offer[];
//   vendor: string[];
//   offices?: Office[];
// }

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  public list$: BehaviorSubject<Offer[]> = new BehaviorSubject<Offer[]>([]);
  public listMap$: BehaviorSubject<Offer[]> = new BehaviorSubject<Offer[]>([]);
  public filterOffice$: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);
  public filterCfg: FilterConfig = {};
  private listUpdateTimeout = 0;

  constructor(
    private offerService: OfferService,
    private sortService: SortService
  ) {}

  filter(cfg: Partial<FilterConfig>): void {
    this.filterCfg = { ...this.filterCfg, ...cfg };
    this.updateList();
  }

  filterMap(officeId: string[]): void {
    this.filterOffice$.next(officeId);
  }

  private applyFilter(offers: Offer[]) {
    return offers.filter((offer) => {
      if (this.filterCfg.tag && !offer.tags.includes(this.filterCfg.tag))
        return false;
      return true;
    });
  }

  private applyFilterMap(offer: Offer[], office: string[]) {
    return offer.filter((offer) => {
      if (office?.length) {
        const officesId = offer.offices.map((o) => o.id);
        if (!this.isIntersects(office, officesId)) return false;
      }
      return true;
    });
  }

  private updateList(): void {
    // const offers: OffersData = {};
    // this.offerService
    //   .getOffers(this.filterCfg as { city: string })
    //   .subscribe((offers: Offer[]) => {
    //     offers.map((offer) => {
    //       this.offerService
    //         .getVendorInfoByOfferId(offer.id)
    //         .subscribe((vendor) =>
    //           Object.assign(offers, {
    //             vendorName: vendor.name,
    //             vendorId: vendor.id
    //           })
    //         );
    //       this.offerService.getVendorInfoByOfferId(offer.id);
    //     });
    if (this.listUpdateTimeout) clearTimeout(this.listUpdateTimeout);
    setTimeout(() => {
      this.offerService
        .getOffers(this.filterCfg as { city: string })
        .subscribe((offers: Offer[]) =>
          this.list$.next(this.applyFilter(offers))
        );
    }, 50);
  }

  get resultList$(): Observable<Offer[]> {
    return this.list$.pipe(
      mergeMap((offers: Offer[]) =>
        this.filterOffice$.pipe(
          map((offices: string[]) => this.applyFilterMap(offers, offices))
        )
      ),
      mergeMap((offers: Offer[]) =>
        this.sortService.parameter$.pipe(
          map((parameter: string) =>
            this.sortService.sortOfferList(parameter, offers)
          )
        )
      )
    );
  }
  isIntersects<T>(list: T[], list2: T[]): boolean {
    return list.some((item) => list2.includes(item));
  }
  filterByTags(tag: string): void {
    if (tag === this.filterCfg.tag) {
      this.filter({ tag: '' });
    } else {
      this.filter({ tag });
    }
  }
}
