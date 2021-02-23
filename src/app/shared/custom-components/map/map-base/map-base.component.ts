import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { MapService } from '@shared/services/map.service';
import * as L from 'leaflet';
import 'leaflet.markercluster';

@Component({
  selector: 'app-map-base',
  templateUrl: './map-base.component.html',
  styleUrls: ['./map-base.component.scss']
})
export class MapBaseComponent implements OnInit, OnChanges {
  map!: L.Map;
  @Input() city!: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() markers!: any; //TODO I will change the type
  markerAll = new L.MarkerClusterGroup({ animateAddingMarkers: true });
  private debouceTimeout!: number;
  carValue!: string;

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.mapView();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.city) {
      this.mapService.getCityView(changes.city.currentValue).then((data) => {
        this.map.setView([+data[0].y, +data[0].x]);
      });
    }
    if (changes.markers) {
      if (this.debouceTimeout) clearTimeout(this.debouceTimeout);
      this.debouceTimeout = window.setTimeout(() => {
        this.markerAll.clearLayers();
        this.markerAll.addLayers(changes.markers.currentValue);
        this.map.addLayer(this.markerAll);
      }, 100);
    }
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
}
