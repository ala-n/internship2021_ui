import {
  Component,
  EventEmitter,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import * as L from 'leaflet';
import { Layer } from 'leaflet';
import { GeoSearchControl } from 'leaflet-geosearch';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { AlgoliaProvider } from 'leaflet-geosearch';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FormDialogComponent implements OnInit {
  map!: L.Map;
  coordinate!: L.LatLng;
  theMarker!: Layer;
  saveButton = false;
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  addressCordinates = new EventEmitter<L.LatLng>();
  myIcon = L.icon({
    iconUrl: '../../../assets/leaflet/images/marker-icon-2x.png',
    iconSize: [15 * 0.75, 30 * 0.75],
    iconAnchor: [5 * 0.75, 30 * 0.75]
  });

  ngOnInit(): void {
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
      latlng = L.latLng(53.684909765450755, 23.845177013681916);
    this.map = L.map('mapAdmin', { center: latlng, zoom: 15, layers: [tiles] });
    // you want to get it of the window global
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
}
