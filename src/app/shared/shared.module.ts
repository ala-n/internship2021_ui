import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './custom-components/toolbar/toolbar.component';
import { MapComponent } from './custom-components/map/map.component';
import { MaterialModule } from './material-components/material.module';

@NgModule({
  declarations: [ToolbarComponent, MapComponent],
  imports: [CommonModule, MaterialModule],
  exports: [ToolbarComponent, MapComponent, MaterialModule]
})
export class SharedModule {}
