import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPageRoutingModule } from './admin-page-routing.module';
import { AdminPageComponent } from './admin-page.component';
import { AdminSidenavComponent } from './admin-sidenav/admin-sidenav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminSidenavModule } from './admin-sidenav/admin-sidenav.module';

@NgModule({
  declarations: [AdminPageComponent, AdminSidenavComponent],
  imports: [
    CommonModule,
    AdminPageRoutingModule,
    LayoutModule,
    AdminSidenavModule,
    SharedModule
  ]
})
export class AdminPageModule {}
