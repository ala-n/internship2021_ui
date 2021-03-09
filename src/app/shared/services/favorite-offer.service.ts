import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';

interface Favorite {
  id?: string;
  offerId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class FavoriteOfferService {
  static FAVORITE_OFFER_URL = '/api/favoriteOffer';

  constructor(private http: HttpService) {}

  addFavoriteOffer(id: string): Observable<Favorite> {
    return this.http.post(
      `${FavoriteOfferService.FAVORITE_OFFER_URL}/add/${id}`,
      ''
    );
  }

  isFavoriteOffer(id: string): Observable<Favorite> {
    return this.http.get(`${FavoriteOfferService.FAVORITE_OFFER_URL}/${id}`);
  }

  deleteFavoriteOffer(id: string): Observable<Favorite> {
    return this.http.delete(`${FavoriteOfferService.FAVORITE_OFFER_URL}/${id}`);
  }

  getAllFavoriteOffers(): Observable<Favorite[]> {
    return this.http.get(`${FavoriteOfferService.FAVORITE_OFFER_URL}/all`);
  }
}
