import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './custom-components/toolbar/toolbar.component';
import { MapComponent } from './custom-components/map/map.component';
import { MaterialModule } from './material-components/material.module';
import { LocationComponent } from './custom-components/location/location.component';
import { LanguageComponent } from './custom-components/language/language.component';
import { PopupComponent } from './custom-components/map/popup/popup.component';

import { SearchComponent } from './custom-components/toolbar/search/search.component';
import { TagsComponent } from './custom-components/toolbar/tags/tags.component';
import { GoBackButtonComponent } from './custom-components/go-back-button/go-back-button.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OfferItemComponent } from './custom-components/offer-item/offer-item.component';

import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MapBaseComponent } from './custom-components/map/map-base/map-base.component';

import { HostnamePipe } from '@shared/pipes/hostname.pipe';
import { RatingComponent } from './custom-components/rating/rating.component';
import { RatingTwoComponent } from './custom-components/rating-two/rating-two.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    MapComponent,
    PopupComponent,
    LocationComponent,
    LanguageComponent,
    SearchComponent,
    TagsComponent,
    OfferItemComponent,
    GoBackButtonComponent,
    MapBaseComponent,
    HostnamePipe,
    RatingComponent,
    RatingTwoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule
  ],
  exports: [
    ToolbarComponent,
    MapComponent,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LocationComponent,
    LanguageComponent,
    FormsModule,
    OfferItemComponent,
    TranslateModule,
    GoBackButtonComponent,
    MapBaseComponent,
    HostnamePipe,
    RatingComponent,
    RatingTwoComponent
  ],
  entryComponents: [PopupComponent]
})
export class SharedModule {}
