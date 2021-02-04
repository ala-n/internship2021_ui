import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material-components/material.module';
import { ToolbarComponent } from './custom-components/toolbar/toolbar.component';
import { MapComponent } from './custom-components/map/map.component';
import { LocationComponent } from './custom-components/location/location.component';
import { LanguageComponent } from './custom-components/language/language.component';
import { PopupComponent } from './custom-components/map/popup/popup.component';
import { OfferItemComponent } from './custom-components/offer-item/offer-item.component';
import { ApiService } from './services/api.service';
import { MockApiService } from './services/api.service.mock';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    ToolbarComponent,
    MapComponent,
    PopupComponent,
    LocationComponent,
    LanguageComponent,
    OfferItemComponent
  ],
  imports: [CommonModule, MaterialModule],
  exports: [
    ToolbarComponent,
    MapComponent,
    MaterialModule,
    LocationComponent,
    LanguageComponent,
    OfferItemComponent
  ],
  entryComponents: [PopupComponent],
  providers: [
    {
      provide: ApiService,
      useClass: environment.local ? MockApiService : ApiService
    }
  ]
})
export class SharedModule {}
