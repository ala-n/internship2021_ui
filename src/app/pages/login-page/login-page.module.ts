import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogInComponent } from './login-page.component';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LogInComponent],
  imports: [CommonModule, SharedModule, RouterModule]
})
export class LogInPageModule {}
