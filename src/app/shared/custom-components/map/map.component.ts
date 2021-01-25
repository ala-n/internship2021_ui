import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map!: L.Map;

  addressPoints = [
    [53.89666423810507, 27.548806307401655, 'Гостиный двор'],
    [53.89730906648985, 27.54977190264391, 'Седьмое небо'],
    [53.897953884923716, 27.548570273009105, 'Simple'],
    [53.89885787836365, 27.5456198430932, 'Catch'],
    [53.90521078495627, 27.552494582918026, 'KFC'],
    [53.90723000354542, 27.55088140776327, 'Hotfix'],
    [53.93040237071748, 27.588482786387512, 'Coffee UTRO'],
    [53.897095993211444, 27.581948454925474, 'Астара'],
    [53.89398604259892, 27.566282814170943, 'Я ж тебе говорил!']
  ];
  myIcon = L.icon({
    iconUrl: '../../../assets/leaflet/images/marker-icon-2x.png',
    iconSize: [15, 30],
    iconAnchor: [18, 70],
    popupAnchor: [-7, -76],
    shadowUrl: '../../../assets/leaflet/images/marker-shadow.png',
    shadowSize: [28, 30],
    shadowAnchor: [18, 70]
  });

  ngOnInit(): void {
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

    const markers = L.markerClusterGroup();

    for (const ad of this.addressPoints) {
      const marker = L.marker(new L.LatLng(Number(ad[0]), Number(ad[1])), {
        title: ad[2].toString(),
        icon: this.myIcon
      });
      marker.bindPopup(ad[2].toString());
      markers.addLayer(marker);
    }
    map.addLayer(markers);
  }
}
