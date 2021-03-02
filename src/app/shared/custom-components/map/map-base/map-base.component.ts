import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { MapService } from '@shared/services/map.service';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.locatecontrol';
import { OfferListPageService } from 'src/app/pages/home-page/offer-list-page/offer-list-page.service';
export type MarkerExtended = L.Marker & { officeId?: string };

@Component({
  selector: 'app-map-base',
  templateUrl: './map-base.component.html',
  styleUrls: ['./map-base.component.scss']
})
export class MapBaseComponent implements OnInit, OnChanges, OnDestroy {
  map!: L.Map;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Output() detectChanges: EventEmitter<any> = new EventEmitter();
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
    private mapService: MapService,
    private offerListService: OfferListPageService
  ) {}

  ngOnInit(): void {
    this.mapView();
    this.map.on('moveend', () => {
      const officeId: string[] = [];
      if (this.markers) {
        for (const marker of this.markers) {
          if (this.map.getBounds().contains(marker.getLatLng())) {
            if (marker.officeId) officeId.push(marker.officeId);
          }
        }
        this.offerListService.filterOfferList(officeId); //TODO: this task not completed yet. skip
      }
    });
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
    this.map
      .on('locationfound', (e) => {
        this.mapService
          .getNameCity(e.latlng.lat, e.latlng.lng, 'en-US,en')
          .then((data) => {
            this.mapService.setCity(data.address.city);
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
