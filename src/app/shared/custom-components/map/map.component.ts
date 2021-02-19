import { Component, OnDestroy, OnInit } from '@angular/core';
import { MapService } from '@shared/services/map.service';
import * as L from 'leaflet';
import 'leaflet.markercluster';
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

  map!: L.Map;
  city!: string;
  markerAll = new L.MarkerClusterGroup({ animateAddingMarkers: true });
  name!: string;
  private debouceTimeout!: number;

  constructor(
    private mapService: MapService,
    private offerService: OfferService
  ) {}

  ngOnInit(): void {
    this.mapView();
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
    const markers = this.initOfficeMarkers(office);
    this.applyMarkers(markers);
  }

  onChangeOffers(): void {
    this.offerRequest$ = this.offerService
      .getOffers({ city: this.city })
      .subscribe((offers) => {
        const markers = this.initOffersMarkers(offers);
        this.applyMarkers(markers);
      });
  }

  onClickItem(data: Offer | Vendor): void {
    this.offerRequest$.unsubscribe();
    const markers = this.initMarkers(data);
    this.applyMarkers(markers);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  applyMarkers(markers: any[]): void {
    if (this.debouceTimeout) clearTimeout(this.debouceTimeout);
    this.debouceTimeout = window.setTimeout(() => {
      this.markerAll.clearLayers();
      this.markerAll.addLayers(markers);
      this.map.addLayer(this.markerAll);
    }, 100);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private initMarkers(data: any) {
    const { name, offices, vendorName } = data;
    if (name) this.name = name;
    else this.name = vendorName;
    this.mapService.getCityView(this.city).then((data) => {
      this.map.setView([+data[0].y, +data[0].x]);
    });
    const markers = [];
    for (const office of offices) {
      const marker = this.mapService.getMarkers(office, this.name);
      markers.push(marker);
    }
    return markers;
  }

  private initOffersMarkers(offers: Offer[]) {
    this.mapService.getCityView(this.city).then((data) => {
      this.map.setView([+data[0].y, +data[0].x]);
    });
    const markers = [];
    for (const offer of offers) {
      for (const office of offer.offices) {
        const marker = this.mapService.getMarkers(office, offer.vendorName);
        markers.push(marker);
      }
    }
    return markers;
  }

  private initOfficeMarkers(office: Office) {
    const markers = [];
    this.mapService.getCityView(office.city).then((data) => {
      this.map.setView([+data[0].y, +data[0].x]);
    });
    const marker = this.mapService.getMarkers(office, this.name);
    markers.push(marker);
    return markers;
  }

  private mapView() {
    const tiles = L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          maxZoom: 18,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Points &copy 2012 LINZ'
        }
      ),
      latlng = L.latLng(0, 0);
    this.map = L.map('map', { center: latlng, zoom: 11, layers: [tiles] });
  }

  ngDoCheck(): void {
    this.mapService.doCheckMap();
  }

  ngOnDestroy(): void {
    this.subscription.forEach((s: Subscription) => s.unsubscribe());
  }
}
