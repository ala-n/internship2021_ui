import {
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Injector
} from '@angular/core';
import { PopupComponent } from '@shared/custom-components/map/popup/popup.component';
import { Offer } from '@shared/models/offer';
import { Office } from '@shared/models/office';
import { Vendor } from '@shared/models/vendor';
import { ConcatPipe } from '@shared/pipes/concat.pipe';
import * as L from 'leaflet';
import { Layer, Marker } from 'leaflet';
// import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { EsriProvider } from 'leaflet-geosearch';
import { BehaviorSubject } from 'rxjs';

interface MarkerMetaData {
  markerInstance: Marker;
  componentInstance: ComponentRef<PopupComponent>;
}

export interface OfficeMarker {
  officeId: string;
  distanceTo: number;
}

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private readonly concat = new ConcatPipe().transform;

  private _offer$ = new BehaviorSubject<Offer | null>(null);
  private _office$ = new BehaviorSubject<Office | null>(null);
  private _vendor$ = new BehaviorSubject<Vendor | null>(null);

  readonly offer$ = this._offer$.asObservable();
  readonly office$ = this._office$.asObservable();
  readonly vendor$ = this._vendor$.asObservable();

  userCoord!: L.LatLng;
  distanceToMarkers: Map<string, number> = new Map();
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
    private resolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  setOffer(offer: Offer): void {
    this._offer$.next(offer);
  }

  setOffice(office: Office): void {
    this._office$.next(office);
  }

  setVendor(vendor: Vendor): void {
    this._vendor$.next(vendor);
  }

  clearOffer(): void {
    this._offer$.next(null);
  }

  clearVendor(): void {
    this._vendor$.next(null);
  }

  clearOffice(): void {
    this._office$.next(null);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getNameCity(lat: number, lon: number, lang: string): Promise<any> {
    const locate = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&accept-language=${lang}}`
    );
    return await locate.json();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getCityView(city: string): Promise<any> {
    // const provider = new OpenStreetMapProvider();
    const provider = new EsriProvider();
    const results = await provider.search({ query: city });
    return results;
  }

  getMarkers(office: Office, name: string): L.Marker<Layer> {
    const factory = this.resolver.resolveComponentFactory(PopupComponent);
    const component = factory.create(this.injector);
    const popupContent = component.location.nativeElement;

    component.instance.office = office;
    component.instance.vendorName = name;
    component.instance.address = this.concat([
      office.street,
      office.house,
      office.room
    ]);
    component.instance.phoneNumber = office.phone;
    const marker = L.marker(
      new L.LatLng(office.location[0], office.location[1]),
      {
        icon: this.myIcon
      }
    );
    Object.assign(marker, { officeId: office.id });
    marker.bindPopup(popupContent);
    this.markerPopup.push({
      markerInstance: marker,
      componentInstance: component
    });
    return marker;
  }

  doCheckMap(): void {
    this.markerPopup.forEach((offer) => {
      offer.componentInstance.changeDetectorRef.detectChanges();
    });
  }
}
