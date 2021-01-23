import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './custom-components/toolbar/toolbar.component';
import { MapComponent } from './custom-components/map/map.component';
import { MaterialModule } from './material-components/buttons/material.module';
import { MaterialLogModule } from './material-components/login/materialLog.module';

@NgModule({
  declarations: [
    ToolbarComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    MaterialLogModule
  ],
  exports: [
    ToolbarComponent,
    MapComponent,
    MaterialModule
  ]
})
export class SharedModule { }
