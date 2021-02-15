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

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OfferItemComponent } from './custom-components/offer-item/offer-item.component';

import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ToolbarComponent,
    MapComponent,
    PopupComponent,
    LocationComponent,
    LanguageComponent,
    SearchComponent,
    TagsComponent,
    OfferItemComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
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
    OfferItemComponent
  ],
  entryComponents: [PopupComponent]
})
export class SharedModule {}
