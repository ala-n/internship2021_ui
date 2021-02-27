import { Component, OnDestroy, OnInit } from '@angular/core';
import { MapService } from '@shared/services/map.service';
import { Subscription } from 'rxjs';
import { Offer } from '@shared/models/offer';
import { Office } from '@shared/models/office';
import { OfferService } from '@shared/services/offer.service';
import { Vendor } from '@shared/models/vendor';

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  markers!: any; //TODO I will change the type

  constructor(
    private mapService: MapService,
    private offerService: OfferService
  ) {}

  ngOnInit(): void {
    const subscription$ = this.mapService.city$.subscribe((city) => {
      this.city = city;
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
    this.offerRequest$ = this.offerService
      .getOffers({ city: this.city })
      .subscribe((offers) => {
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
    const markers = [];
    const uniqId: string[] = [];
    for (const offer of offers) {
      for (const office of offer.offices) {
        if (uniqId.indexOf(office.id) === -1) {
          const marker = this.mapService.getMarkers(office, offer.vendorName);
          markers.push(marker);
          uniqId.push(office.id);
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
