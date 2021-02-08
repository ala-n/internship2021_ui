import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';

import { SharedModule } from 'src/app/shared/shared.module';

import { AdminPageRoutingModule } from './admin-page-routing.module';
import { AdminPageComponent } from './admin-page.component';
import { AdminSidenavComponent } from './admin-sidenav/admin-sidenav.component';
import { TableComponent } from './admin-table/table.component';
import { VendorFormComponent } from './vendor-form/vendor-form.component';

@NgModule({
  declarations: [
    AdminPageComponent,
    AdminSidenavComponent,
    VendorFormComponent,
    AdminSidenavComponent,
    TableComponent
  ],
  imports: [CommonModule, AdminPageRoutingModule, LayoutModule, SharedModule]
})
export class AdminPageModule {}
