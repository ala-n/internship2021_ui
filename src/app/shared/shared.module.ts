import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './custom-components/toolbar/toolbar.component';
import { MapComponent } from './custom-components/map/map.component';
import { MaterialModule } from './material-components/material.module';
import { LocationComponent } from './custom-components/location/location.component';
import { LanguageComponent } from './custom-components/language/language.component';

@NgModule({
  declarations: [
    LocationComponent,
    LanguageComponent,
    MapComponent,
    ToolbarComponent
  ],
  imports: [CommonModule, MaterialModule],
  exports: [
    LocationComponent,
    LanguageComponent,
    MapComponent,
    ToolbarComponent,
    MaterialModule
  ]
})
export class SharedModule {}
