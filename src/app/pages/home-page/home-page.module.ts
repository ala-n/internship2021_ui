import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { OfferListComponent } from './offer-list/offer-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OfferItemComponent } from './offer-list/offer-item/offer-item.component';
import { SortByComponent } from './offer-list/sort/sort.component';
import { OfferItemPageComponent } from './offer-item-page/offer-item-page.component';

@NgModule({
  declarations: [
    HomePageComponent,
    OfferListComponent,
    OfferItemComponent,
    SortByComponent,
    OfferItemPageComponent
  ],
  imports: [CommonModule, HomePageRoutingModule, SharedModule]
})
export class HomePageModule {}
