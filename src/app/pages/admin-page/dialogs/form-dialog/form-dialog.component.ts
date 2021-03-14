import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { MapService } from '@shared/services/map/map.service';
import { LocationService } from '@shared/services/state/location.service';
import * as L from 'leaflet';
import { Layer } from 'leaflet';
import { GeoSearchControl } from 'leaflet-geosearch';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { AlgoliaProvider } from 'leaflet-geosearch';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormDialogComponent implements OnInit, OnDestroy {
  map!: L.Map;
  coordinate!: L.LatLng;
  theMarker!: Layer;
  saveButton = false;
  subscription: Subscription[] = [];
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  addressCordinates = new EventEmitter<L.LatLng>();
  myIcon = L.icon({
    iconUrl: '../../../assets/leaflet/images/marker-icon-2x.png',
    iconSize: [15 * 0.75, 30 * 0.75],
    iconAnchor: [5 * 0.75, 30 * 0.75]
  });

  constructor(
    private mapService: MapService,
    private locationService: LocationService
  ) {}

  ngOnInit(): void {
    this.mapView();
    const subscription$ = this.locationService.city$.subscribe((city) => {
      this.mapService.getCityView(city).then((data) => {
        this.map.setView([+data[0].y, +data[0].x], 11);
      });
    });
    this.subscription.push(subscription$);
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
    this.map = L.map('mapAdmin', { center: latlng, zoom: 15, layers: [tiles] });
    const provider = new AlgoliaProvider();
    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    const control = new (GeoSearchControl as any)({
      provider,
      autoComplete: true,
      style: 'bar',
      showMarker: false,
      keepResult: true
    }) as L.Control;
    this.map.addControl(control);
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      if (this.theMarker != undefined) {
        this.map.removeLayer(this.theMarker);
      } else this.saveButton = !this.saveButton;
      this.coordinate = e.latlng;
      this.theMarker = L.marker(this.coordinate, { icon: this.myIcon }).addTo(
        this.map
      );
    });
  }
  pickedAddress(): void {
    if (this.coordinate) {
      this.addressCordinates.emit(this.coordinate);
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach((s: Subscription) => s.unsubscribe());
  }
}
