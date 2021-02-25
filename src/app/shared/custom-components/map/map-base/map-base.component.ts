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
import { fromEvent, from } from 'rxjs';
import { debounceTime, mergeMap } from 'rxjs/operators';
import { FromEventTarget } from 'rxjs/internal/observable/fromEvent';

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() markers!: any; //TODO I will change the type
  markerAll = new L.MarkerClusterGroup({ animateAddingMarkers: true });
  private debouceTimeout!: number;
  carValue!: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  marker!: any;

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.mapView();
    fromEvent(this.map as FromEventTarget<L.LeafletEvent>, 'moveend')
      .pipe(
        debounceTime(500),
        mergeMap(() => {
          const { lat, lng } = this.map.getCenter();
          return from(this.mapService.getNameCity(lat, lng));
        })
      )
      .subscribe((data) => {
        if (!data.address.city) return;
        this.mapService.setCity(data.address.city);
      });

    this.map.on('moveend', () => {
      //TODO: i will change all logic here, dont worry guys)
      if (this.markers) {
        for (const marker of this.markers) {
          if (
            marker._icon &&
            !this.map.getBounds().contains(marker.getLatLng())
          ) {
            console.log(marker);

            this.map.removeLayer(marker);
          }
        }
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
    L.control
      .locate({
        keepCurrentZoomLevel: true,
        showPopup: false,
        flyTo: true,
        locateOptions: {
          enableHighAccuracy: true,
          timeout: 1000, //no effect
          maximumAge: 1000
        }
      })
      .addTo(this.map);
    this.map
      .on('locationfound', (e) => {
        this.mapService.getNameCity(e.latlng.lat, e.latlng.lng).then((data) => {
          this.mapService.setCity(data.address.city);
        });
        //TODO: i will change all logic here, dont worry guys)
        this.map.stopLocate();
      })
      .on('locationerror', (e) => {
        console.log(e);
      });
  }

  ngOnDestroy(): void {
    this.map.off();
    this.map.stopLocate();
  }
}
