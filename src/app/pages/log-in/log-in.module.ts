import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { LogInComponent } from './log-in.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LogInRoutingModule } from './log-in-routing.module';

@NgModule({
    declarations: [
      LogInComponent
    ],
    imports: [
      CommonModule,
      LogInRoutingModule,
      SharedModule,
    ],
    exports: [
      LogInComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  })
export class LogInPageModule { }