import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { OfferListComponent } from './offer-list/offer-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { OfferItemComponent } from './offer-list/offer-item/offer-item.component';
import { SortByComponent } from './sort-by/sort-by.component';

@NgModule({
  declarations: [HomePageComponent, OfferListComponent, OfferItemComponent, SortByComponent],
  imports: [CommonModule, HomePageRoutingModule, SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}
