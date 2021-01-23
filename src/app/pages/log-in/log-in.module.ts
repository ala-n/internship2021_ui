import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialLogModule } from 'src/app/shared/material-components/login/materialLog.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { LogInRoutingModule } from './log-in-routing.module';
import { LogInComponent } from './log-in.component';

@NgModule({
    declarations: [
      LogInComponent
    ],
    imports: [
      CommonModule,
      LogInRoutingModule,
      MaterialLogModule
    ],
    exports: [
      LogInComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  })
  export class LogInPageModule { }