import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './custom-components/toolbar/toolbar.component';
import { MapComponent } from './custom-components/map/map.component';
import { MaterialModule } from './material-components/material.module';
import { LogoComponent } from './custom-components/logo/logo.component';

@NgModule({
  declarations: [ToolbarComponent, MapComponent, LogoComponent],
  imports: [CommonModule, MaterialModule],
  exports: [ToolbarComponent, MapComponent, MaterialModule, LogoComponent]
})
export class SharedModule {}
