import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Injector,
  OnInit
} from '@angular/core';
import * as L from 'leaflet';
import { Marker } from 'leaflet';
import 'leaflet.markercluster';
import { Offer } from '../../models/offer';
import { OfferService } from '../../services/offer.service';
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
export class MapComponent implements OnInit {
  offers!: Offer[];
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
    private offerService: OfferService,
    private resolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  ngOnInit(): void {
    this.offers = this.offerService.getOffers();
    this.mapView();
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
      latlng = L.latLng(53.902284, 27.561831);
    const map = L.map('map', { center: latlng, zoom: 12, layers: [tiles] });
    const markers = this.onMarker();
    map.addLayer(markers);
  }

  private onMarker() {
    const markers = L.markerClusterGroup();
    for (const offer of this.offers) {
      for (const loc of offer.location) {
        const factory = this.resolver.resolveComponentFactory(PopupComponent);
        const component = factory.create(this.injector);
        const popupContent = component.location.nativeElement;
        component.instance.offer = offer;
        component.instance.address = loc.address;
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
