import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { SharedModule } from '@shared/shared.module';
import { SortByComponent } from './offer-list-page/sort/sort.component';
import { OfferItemPageComponent } from './offer-item-page/offer-item-page.component';
import { OfferListPageComponent } from './offer-list-page/offer-list-page.component';
import { VendorItemPageComponent } from './vendor-item-page/vendor-item-page.component';
import { OfficeItemPageComponent } from './office-item-page/office-item-page.component';

import { ConcatPipe } from '@shared/pipes/concat.pipe';

@NgModule({
  declarations: [
    HomePageComponent,
    SortByComponent,
    OfferItemPageComponent,
    OfferListPageComponent,
    VendorItemPageComponent,
    OfficeItemPageComponent,
    ConcatPipe
  ],
  imports: [CommonModule, HomePageRoutingModule, SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}
