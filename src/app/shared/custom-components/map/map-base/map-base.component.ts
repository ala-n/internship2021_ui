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
import { takeLast } from 'rxjs/operators';

@Component({
  selector: 'app-map-base',
  templateUrl: './map-base.component.html',
  styleUrls: ['./map-base.component.scss']
})
export class MapBaseComponent implements OnInit, OnChanges, OnDestroy {
  map!: L.Map;
  @Output() detectChanges: EventEmitter<any> = new EventEmitter();
  @Input() city!: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Input() markers!: any; //TODO I will change the type
  markerAll = new L.MarkerClusterGroup({ animateAddingMarkers: true });
  private debouceTimeout!: number;
  carValue!: string;
  marker!: any;

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.mapView();
    this.map.on('moveend', () => {
      if (this.markers) {
        for (const marker of this.markers) {
          if (
            marker._icon &&
            !this.map.getBounds().contains(marker.getLatLng())
          ) {
            // this.detectChanges.emit(marker);
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
          setView: true, //no effect
          watch: false, //no effect
          timeout: 1000, //no effect
          maximumAge: 1000
        }
      })
      .addTo(this.map);
    this.map
      .on('locationfound', (e) => {
        this.mapService
          .getNameCity(e.latlng.lat, e.latlng.lng)
          .pipe(takeLast(1))
          .subscribe((data) => {
            console.log(data, e); //TODO: i will remove dont touch

            this.mapService.setCity('Гродно');
          }); //TODO: i will change all logic here, dont worry guys)
      })
      .on('locationerror', (e) => {
        this.mapService
          .getNameCity(53.684909765450755, 23.845177013681916)
          .pipe(takeLast(1))
          .subscribe((data) => {
            console.log(data, e); //TODO: i will remove dont touch
            this.mapService.setCity('Гродно');
          });
      });
  } //TODO: i will change all logic here, dont worry guys)

  ngOnDestroy(): void {
    this.map.stopLocate();
    this.map.remove();
    this.map.off();
  }
}
