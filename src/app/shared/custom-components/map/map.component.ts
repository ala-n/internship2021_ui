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
import 'leaflet.markercluster';
import { Subscription } from 'rxjs';
import { Vendor } from '../../models/vendor';
import { PopupComponent } from './popup/popup.component';
import { Offer } from '@shared/models/offer';

interface MarkerMetaData {
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
  vendorRequest$!: Subscription;

  map!: L.Map;
  city!: string;
  markerPopup: MarkerMetaData[] = [];
  markerAll = new L.MarkerClusterGroup({ animateAddingMarkers: true });
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
    this.mapView();
    const subscription$ = this.mapService.city$.subscribe((city) => {
      this.onChangeMarkerVendor();
      this.city = city;
    });
    this.subscription.push(subscription$);

    const offSubscription$ = this.mapService.offer$.subscribe((offer) => {
      if (offer == null) this.onChangeMarkerVendor();
      else this.onChangeMarkerOffer(offer);
    });
    this.subscription.push(offSubscription$);
  }

  onChangeMarkerVendor(): void {
    this.vendorRequest$ = this.vendorService
      .getVendors()
      .subscribe((vendors) => {
        const markers = this.initMarkers(vendors, this.city);
        this.markerAll.clearLayers();
        this.markerAll.addLayers(markers);
        this.map.addLayer(this.markerAll);
      });
  }

  onChangeMarkerOffer(offer: Offer): void {
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

  private initMarkers(vendors: Vendor[], city: string) {
    this.mapService.getCityView(city).then((data) => {
      this.map.setView([+data[0].y, +data[0].x]);
    });
    const markers = [];
    for (const vendor of vendors) {
      for (const office of vendor.offices) {
        const factory = this.resolver.resolveComponentFactory(PopupComponent);
        const component = factory.create(this.injector);
        const popupContent = component.location.nativeElement;
        component.instance.office = office;
        component.instance.vendorName = vendor.name;
        component.instance.address = office.address;
        component.instance.phoneNumber = office.phone;
        const marker = L.marker(new L.LatLng(office.x, office.y), {
          icon: this.myIcon
        });
        marker.bindPopup(popupContent);
        markers.push(marker);
        this.markerPopup.push({
          markerInstance: marker,
          componentInstance: component
        });
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
      const factory = this.resolver.resolveComponentFactory(PopupComponent);
      const component = factory.create(this.injector);
      const popupContent = component.location.nativeElement;
      component.instance.office = office;
      component.instance.vendorName = vendorName;
      component.instance.address = office.address;
      component.instance.phoneNumber = office.phone;
      const marker = L.marker(new L.LatLng(office.x, office.y), {
        icon: this.myIcon
      });
      marker.bindPopup(popupContent);
      markers.push(marker);
      this.markerPopup.push({
        markerInstance: marker,
        componentInstance: component
      });
    }
    return markers;
  }

  ngDoCheck(): void {
    this.markerPopup.forEach((offer) => {
      offer.componentInstance.changeDetectorRef.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.subscription.forEach((s: Subscription) => s.unsubscribe());
  }
}
