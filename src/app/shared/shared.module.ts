import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './custom-components/map/map.component';
import { MaterialModule } from './material-components/material.module';
import { LocationComponent } from './custom-components/location/location.component';
import { LanguageComponent } from './custom-components/language/language.component';
import { PopupComponent } from './custom-components/map/popup/popup.component';

import { GoBackButtonComponent } from './custom-components/go-back-button/go-back-button.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MapBaseComponent } from './custom-components/map/map-base/map-base.component';

import { HostnamePipe } from '@shared/pipes/hostname.pipe';

import '@shared/custom-components/rating-stars';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginationIntlService } from './services/state/matpaginationintl.service';

@NgModule({
  declarations: [
    MapComponent,
    PopupComponent,
    LocationComponent,
    LanguageComponent,
    GoBackButtonComponent,
    MapBaseComponent,
    HostnamePipe
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
    MapComponent,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    LocationComponent,
    LanguageComponent,
    FormsModule,
    TranslateModule,
    GoBackButtonComponent,
    MapBaseComponent,
    HostnamePipe
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: MatPaginationIntlService
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [PopupComponent]
})
export class SharedModule {}
