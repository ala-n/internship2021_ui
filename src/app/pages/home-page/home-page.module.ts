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
import { HistoryPageComponent } from './history-page/history-page.component';
import { BookmarksPageComponent } from './bookmarks-page/bookmarks-page.component';

import { ConcatPipe } from '@shared/pipes/concat.pipe';
import { PreOrderDialogComponent } from './offer-item-page/pre-order-dialog/pre-order-dialog.component';
import { OfferItemComponent } from './offer-item-page/offer-item/offer-item.component';
import { OfferListComponent } from './offer-list-page/offer-list/offer-list.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { TagsComponent } from './toolbar/tags/tags.component';
import { SearchComponent } from './toolbar/search/search.component';

@NgModule({
  declarations: [
    HomePageComponent,
    SortByComponent,
    OfferItemPageComponent,
    OfferItemComponent,
    OfferListComponent,
    OfferListPageComponent,
    VendorItemPageComponent,
    OfficeItemPageComponent,
    ToolbarComponent,
    TagsComponent,
    SearchComponent,
    ConcatPipe,
    HistoryPageComponent,
    BookmarksPageComponent,
    PreOrderDialogComponent
  ],
  imports: [CommonModule, HomePageRoutingModule, SharedModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}
