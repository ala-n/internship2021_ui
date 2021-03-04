import { Component, OnDestroy, OnInit } from '@angular/core';
import { MapService } from '@shared/services/map.service';
import { Observable, Subscription } from 'rxjs';
import { Offer } from '@shared/models/offer';
import { Office } from '@shared/models/office';
import { Vendor } from '@shared/models/vendor';
import { LocationService } from '@shared/services/location.service';
import type { MarkerExtended } from './map-base/map-base.component';
import { FilterService } from '@shared/services/filter.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  offerRequest$!: Subscription;
  city!: string;
  name!: string;
  markers!: MarkerExtended[];
  offers$!: Observable<Offer[]>;

  constructor(
    private locationService: LocationService,
    private mapService: MapService,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    const subscription$ = this.locationService.city$.subscribe((city) => {
      this.city = city;
      this.filterService.filter({ city });
      this.onChangeOffers();
    });
    this.subscription.push(subscription$);

    const offersSubscription$ = this.mapService.offer$.subscribe((offer) => {
      if (offer == null) this.onChangeOffers();
      else this.onClickItem(offer);
    });
    this.subscription.push(offersSubscription$);

    const officeSubscription$ = this.mapService.office$.subscribe((office) => {
      if (office !== null) this.onChangeOffice(office);
      else this.onChangeOffers();
    });
    this.subscription.push(officeSubscription$);

    const vendorSubscription$ = this.mapService.vendor$.subscribe((vendor) => {
      if (vendor !== null) this.onClickItem(vendor);
      else this.onChangeOffers();
    });
    this.subscription.push(vendorSubscription$);
  }

  onChangeOffice(office: Office): void {
    this.offerRequest$.unsubscribe();
    this.markers = this.initOfficeMarkers(office);
  }

  onChangeOffers(): void {
    this.offers$ = this.filterService.list$;
    this.offers$.subscribe((offers) => {
      this.markers = this.initOffersMarkers(offers);
    });
  }

  onClickItem(data: Offer | Vendor): void {
    this.offerRequest$.unsubscribe();
    this.markers = this.initMarkers(data);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private initMarkers(data: any) {
    const { name, offices, vendorName } = data;
    if (name) this.name = name;
    else this.name = vendorName;
    const markers = [];
    for (const office of offices) {
      const marker = this.mapService.getMarkers(office, this.name);
      markers.push(marker);
    }
    return markers;
  }

  private initOffersMarkers(offers: Offer[]) {
    const uniqs: string | string[] = [];
    const markers = [];
    for (const offer of offers) {
      for (const office of offer.offices) {
        if (uniqs.indexOf(office.id) === -1) {
          const marker = this.mapService.getMarkers(office, offer.vendorName);
          markers.push(marker);
          uniqs.push(office.id);
        }
      }
    }
    return markers;
  }

  private initOfficeMarkers(office: Office) {
    const markers = [];
    const marker = this.mapService.getMarkers(office, this.name);
    markers.push(marker);
    return markers;
  }

  ngDoCheck(): void {
    this.mapService.doCheckMap();
  }

  ngOnDestroy(): void {
    this.subscription.forEach((s: Subscription) => s.unsubscribe());
  }
}
