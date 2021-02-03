import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './custom-components/toolbar/toolbar.component';
import { MapComponent } from './custom-components/map/map.component';
import { MaterialModule } from './material-components/material.module';
import { LocationComponent } from './custom-components/location/location.component';
import { LanguageComponent } from './custom-components/language/language.component';
import { PopupComponent } from './custom-components/map/popup/popup.component';
import { OfferItemComponent } from './custom-components/offer-item/offer-item.component';
import { ApiService } from './services/api.service';
import { MockApiService } from './services/mock-api.service';
import { RealApiService } from './services/real-api.service';
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
      useFactory: () => {
        return environment.local ? new MockApiService() : new RealApiService();
      }
    }
  ]
})
export class SharedModule {}
