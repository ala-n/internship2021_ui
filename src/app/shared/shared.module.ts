import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './custom-components/toolbar/toolbar.component';
import { MapComponent } from './custom-components/map/map.component';
import { MaterialModule } from './material-components/material.module';
import { PopupComponent } from './custom-components/map/popup/popup.component';

@NgModule({
  declarations: [ToolbarComponent, MapComponent, PopupComponent],
  imports: [CommonModule, MaterialModule],
  exports: [ToolbarComponent, MapComponent, MaterialModule],
  entryComponents: [PopupComponent]
})
export class SharedModule {}
