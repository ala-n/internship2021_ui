import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { OfferListComponent } from './offer-list/offer-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [HomePageComponent, OfferListComponent],
  imports: [CommonModule, HomePageRoutingModule, SharedModule],
  exports: [HomePageComponent, OfferListComponent]
})
export class HomePageModule {}
