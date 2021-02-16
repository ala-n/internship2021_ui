import { Component, OnDestroy, OnInit } from '@angular/core';
import { MapService } from '@shared/services/map.service';
import { VendorService } from '@shared/services/vendor.service';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { Subscription } from 'rxjs';
import { Vendor } from '../../models/vendor';
import { Offer } from '@shared/models/offer';
import { Office } from '@shared/models/office';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];
  vendorRequest$!: Subscription;

  map!: L.Map;
  city!: string;
  markerAll = new L.MarkerClusterGroup({ animateAddingMarkers: true });
  name!: string;

  constructor(
    private mapService: MapService,
    private vendorService: VendorService
  ) {}

  ngOnInit(): void {
    this.mapView();
    const subscription$ = this.mapService.city$.subscribe((city) => {
      this.onChangeMarkerVendor();
      this.city = city;
    });
    this.subscription.push(subscription$);

    const offersSubscription$ = this.mapService.offer$.subscribe((offer) => {
      if (offer == null) this.onChangeMarkerVendor();
      else this.onChangeMarkerOffers(offer);
    });
    this.subscription.push(offersSubscription$);

    const officeSubscription$ = this.mapService.office$.subscribe((office) => {
      if (office !== null) this.onChangeMarkerOffice(office);
    });
    this.subscription.push(officeSubscription$);
  }

  onChangeMarkerOffice(office: Office): void {
    this.vendorRequest$.unsubscribe();
    const markers = this.initOfficeMarkers(office);
    this.markerAll.clearLayers();
    this.markerAll.addLayers(markers);
    this.map.addLayer(this.markerAll);
  }

  onChangeMarkerVendor(): void {
    this.vendorRequest$ = this.vendorService
      .getVendors()
      .subscribe((vendors) => {
        const markers = this.initVendorMarkers(vendors, this.city);
        this.markerAll.clearLayers();
        this.markerAll.addLayers(markers);
        this.map.addLayer(this.markerAll);
      });
  }

  onChangeMarkerOffers(offer: Offer): void {
    this.vendorRequest$.unsubscribe();
    const markers = this.initOfferMarkers(offer);
    this.markerAll.clearLayers();
    this.markerAll.addLayers(markers);
    this.map.addLayer(this.markerAll);
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

  private initVendorMarkers(vendors: Vendor[], city: string) {
    this.mapService.getCityView(city).then((data) => {
      this.map.setView([+data[0].y, +data[0].x]);
    });
    const markers = [];
    for (const vendor of vendors) {
      for (const office of vendor.offices) {
        const marker = this.mapService.getMarkers(office, vendor.name);
        markers.push(marker);
      }
    }
    return markers;
  }

  private initOfferMarkers(offer: Offer) {
    const { city, offices, vendorName } = offer;
    this.mapService.getCityView(city).then((data) => {
      this.map.setView([+data[0].y, +data[0].x]);
    });
    const markers = [];
    for (const office of offices) {
      const marker = this.mapService.getMarkers(office, vendorName);
      markers.push(marker);
    }
    return markers;
  }

  private initOfficeMarkers(office: Office) {
    const markers = [];
    this.mapService.getCityView(office.city).then((data) => {
      this.map.setView([+data[0].y, +data[0].x]);
    });
    const marker = this.mapService.getMarkers(office, 'Lol');
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
