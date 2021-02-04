import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './custom-components/toolbar/toolbar.component';
import { MapComponent } from './custom-components/map/map.component';
import { MaterialModule } from './material-components/material.module';
import { LocationComponent } from './custom-components/location/location.component';
import { LanguageComponent } from './custom-components/language/language.component';
import { PopupComponent } from './custom-components/map/popup/popup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OfferItemComponent } from './custom-components/offer-item/offer-item.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    MapComponent,
    PopupComponent,
    LocationComponent,
    LanguageComponent,
    OfferItemComponent
  ],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [
    ToolbarComponent,
    MapComponent,
    MaterialModule,
    LocationComponent,
    LanguageComponent,
    FormsModule,
    ReactiveFormsModule,
    OfferItemComponent
  ],
  entryComponents: [PopupComponent]
})
export class SharedModule {}
