import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

import { AdminPageRoutingModule } from './admin-page-routing.module';
import { AdminPageComponent } from './admin-page.component';
import { AdminSidenavComponent } from './navigation/admin-sidenav/admin-sidenav.component';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import { OfferFormComponent } from './forms/offer-form/offer-form.component';
import { OfferTableComponent } from './tables/offer-table/offer-table.component';
import { OfficeFormComponent } from './forms/office-form/office-form.component';
import { OfficeTableComponent } from './tables/office-table/office-table.component';
import { VendorFormComponent } from './forms/vendor-form/vendor-form.component';
import { VendorNavComponent } from './navigation/vendor-nav/vendor-nav.component';
import { VendorTableComponent } from './tables/vendor-table/vendor-table.component';

import { TruncatePipe } from '@shared/pipes/truncate.pipe';
import { VendorStatTableComponent } from './tables/vendor-stat-table/vendor-stat-table.component';
import { OfferStatTableComponent } from './tables/offer-stat-table/offer-stat-table.component';
import { TagsStatTableComponent } from './tables/tags-stat-table/tags-stat-table.component';
import { StatNavComponent } from './navigation/stat-nav/stat-nav.component';

@NgModule({
  declarations: [
    AdminPageComponent,
    AdminSidenavComponent,
    FormDialogComponent,
    OfferFormComponent,
    OfferTableComponent,
    OfficeFormComponent,
    OfferStatTableComponent,
    OfficeTableComponent,
    StatNavComponent,
    TagsStatTableComponent,
    VendorFormComponent,
    VendorNavComponent,
    VendorStatTableComponent,
    VendorTableComponent,
    TruncatePipe
  ],
  imports: [
    CommonModule,
    AdminPageRoutingModule,
    LayoutModule,
    SharedModule,
    RouterModule
  ]
})
export class AdminPageModule {}
