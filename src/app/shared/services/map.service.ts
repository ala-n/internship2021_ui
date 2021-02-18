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
import * as L from 'leaflet';
import { Marker } from 'leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { BehaviorSubject } from 'rxjs';

interface MarkerMetaData {
  markerInstance: Marker;
  componentInstance: ComponentRef<PopupComponent>;
}

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private _city$ = new BehaviorSubject<string>('');
  private _offer$ = new BehaviorSubject<Offer | null>(null);
  private _office$ = new BehaviorSubject<Office | null>(null);
  private _vendor$ = new BehaviorSubject<Vendor | null>(null);
  readonly city$ = this._city$.asObservable();
  readonly offer$ = this._offer$.asObservable();
  readonly office$ = this._office$.asObservable();
  readonly vendor$ = this._vendor$.asObservable();
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

  setCity(city: string): void {
    this._city$.next(city);
  }

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
    this._vendor$.next(null);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getCityView(city: string): Promise<any> {
    const provider = new OpenStreetMapProvider();
    const results = await provider.search({ query: city });
    return results;
  }

  getMarkers(office: Office, name: string): L.Marker {
    const factory = this.resolver.resolveComponentFactory(PopupComponent);
    const component = factory.create(this.injector);
    const popupContent = component.location.nativeElement;
    component.instance.office = office;
    component.instance.vendorName = name;
    component.instance.address = office.address;
    component.instance.phoneNumber = office.phone;
    const marker = L.marker(new L.LatLng(office.x, office.y), {
      icon: this.myIcon
    });
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
