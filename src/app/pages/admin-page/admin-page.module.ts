import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';

import { SharedModule } from 'src/app/shared/shared.module';

import { AdminPageRoutingModule } from './admin-page-routing.module';
import { AdminPageComponent } from './admin-page.component';
import { AdminSidenavComponent } from './admin-sidenav/admin-sidenav.component';
import { VendorTableComponent } from './tables/vendor-table/vendor-table.component';
import { VendorFormComponent } from './forms/vendor-form/vendor-form.component';
import { OfficeFormComponent } from './forms/office-form/office-form.component';

@NgModule({
  declarations: [
    AdminPageComponent,
    AdminSidenavComponent,
    VendorFormComponent,
    AdminSidenavComponent,
    VendorTableComponent,
    OfficeFormComponent
  ],
  imports: [CommonModule, AdminPageRoutingModule, LayoutModule, SharedModule]
})
export class AdminPageModule {}
