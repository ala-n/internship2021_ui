import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogInComponent } from './log-in.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LogInComponent],
  imports: [CommonModule, SharedModule, RouterModule]
})
export class LogInPageModule {}
