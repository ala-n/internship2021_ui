import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Injector,
  OnDestroy,
  OnInit
} from '@angular/core';
import { MapService } from '@shared/services/map.service';
import { VendorService } from '@shared/services/vendor.service';

import * as L from 'leaflet';
import { Marker } from 'leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet.markercluster';
import { Subscription } from 'rxjs';
import { Vendor } from '../../models/vendor';
import { PopupComponent } from './popup/popup.component';

interface MarkerMetaData {
  address: string;
  markerInstance: Marker;
  componentInstance: ComponentRef<PopupComponent>;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  subscription: Subscription[] = [];

  vendors: Vendor[] = [];
  map!: L.Map;
  markerPopup: MarkerMetaData[] = [];
  myIcon = L.icon({
    iconUrl: '../../../assets/leaflet/images/marker-icon-2x.png',
    iconSize: [15, 30],
    iconAnchor: [18, 70],
    popupAnchor: [-10, -66],
    shadowUrl: '../../../assets/leaflet/images/marker-shadow.png',
    shadowSize: [28, 30],
    shadowAnchor: [18, 70]
  });

  constructor(
    private mapService: MapService,
    private vendorService: VendorService,
    private resolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  ngOnInit(): void {
    this.vendorService.getVendors().subscribe((vendors) => {
      this.vendors = vendors;
      this.mapView();
    });
    this.subscription.push(
      this.mapService.city$.subscribe((city) => this.setView(city))
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((s: Subscription) => s.unsubscribe());
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
    this.map = L.map('map', { center: latlng, zoom: 12, layers: [tiles] });
    const markers = this.onMarker();
    this.map.addLayer(markers);
  }

  async setView(city: string): Promise<void> {
    const provider = new OpenStreetMapProvider();
    const results = await provider.search({ query: city });
    //TODO(abarmina) fix quick refresh bug.
    if (this.map)
      this.map.setView([Number(results[0].y), Number(results[0].x)]);
  }

  private onMarker() {
    const markers = L.markerClusterGroup();
    for (const vendor of this.vendors) {
      for (const loc of vendor.offices) {
        const factory = this.resolver.resolveComponentFactory(PopupComponent);
        const component = factory.create(this.injector);
        const popupContent = component.location.nativeElement;
        component.instance.vendor = vendor;
        component.instance.address = loc.address;
        component.instance.phoneNumber = loc.phoneNumber;
        const marker = L.marker(new L.LatLng(loc.x, loc.y), {
          title: loc.address,
          icon: this.myIcon
        });
        marker.bindPopup(popupContent);
        markers.addLayer(marker);
        this.markerPopup.push({
          address: loc.address,
          markerInstance: marker,
          componentInstance: component
        });
      }
    }
    return markers;
  }

  ngDoCheck(): void {
    this.markerPopup.forEach((offer) => {
      offer.componentInstance.changeDetectorRef.detectChanges();
    });
  }
}
