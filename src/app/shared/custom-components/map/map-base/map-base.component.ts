import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy
} from '@angular/core';
import { MapService } from '@shared/services/map.service';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.locatecontrol';
import { LocationService } from '@shared/services/location.service';
import { FilterService } from '@shared/services/filter.service';
import { Router } from '@angular/router';
export type MarkerExtended = L.Marker & { officeId?: string };

@Component({
  selector: 'app-map-base',
  templateUrl: './map-base.component.html',
  styleUrls: ['./map-base.component.scss']
})
export class MapBaseComponent implements OnInit, OnChanges, OnDestroy {
  map!: L.Map;
  @Input() city!: string;
  @Input() markers!: MarkerExtended[];
  markerAll = new L.MarkerClusterGroup({
    chunkedLoading: true,
    animateAddingMarkers: true
  });
  private debouceTimeout!: number;
  carValue!: string;
  marker!: L.Marker;

  constructor(
    private locationService: LocationService,
    private mapService: MapService,
    private filterService: FilterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mapView();

    this.map.on('moveend', () => {
      this.rebuildFilter();
    });
  }

  rebuildFilter(): void {
    const officeId: string[] = [];
    this.mapService.distanceToMarkers = new Map();

    if (!this.markers) return;

    const visibleMarkers = this.markers.filter((marker) => {
      return this.map.getBounds().contains(marker.getLatLng());
    });

    for (const marker of visibleMarkers) {
      marker.officeId && officeId.push(marker.officeId);
      if (marker.officeId && this.mapService.userCoord) {
        this.mapService.distanceToMarkers.set(
          marker.officeId,
          this.mapService.userCoord.distanceTo(marker.getLatLng())
        );
      }
    }

    this.filterService.filterMap(officeId);
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
        this.rebuildFilter();
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
    this.map
      .on('locationfound', (e) => {
        // save user position in coordinates
        this.mapService.userCoord = e.latlng;
        this.mapService
          .getNameCity(e.latlng.lat, e.latlng.lng, 'en-US,en')
          .then((data) => {
            this.locationService.setCity(data.address.city);
            this.router.navigate(['home', data.address.city]);
          });
        this.map.stopLocate();
      })
      .on('locationerror', (e) => {
        console.log(e);
      });
  }

  locateMe(): void {
    this.map.locate({ setView: true, maxZoom: 11 });
  }

  ngOnDestroy(): void {
    this.map.off();
    this.map.stopLocate();
  }
}
