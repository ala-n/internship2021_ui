import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';

import { SharedModule } from 'src/app/shared/shared.module';

import { AdminPageRoutingModule } from './admin-page-routing.module';
import { AdminPageComponent } from './admin-page.component';
import { AdminSidenavComponent } from './admin-sidenav/admin-sidenav.component';
import { OfferFormComponent } from './forms/offer-form/offer-form.component';
import { OfferTableComponent } from './tables/offer-table/offer-table.component';
import { VendorTableComponent } from './tables/vendor-table/vendor-table.component';

import { TruncatePipe } from '@shared/pipes/truncate.pipe';
import { OfficeFormComponent } from './forms/office-form/office-form.component';
import { OfficeTableComponent } from './tables/office-table/office-table.component';
import { VendorFormComponent } from './forms/vendor-form/vendor-form.component';

@NgModule({
  declarations: [
    AdminPageComponent,
    AdminSidenavComponent,
    OfferFormComponent,
    OfferTableComponent,
    OfficeFormComponent,
    OfficeTableComponent,
    VendorFormComponent,
    VendorTableComponent,
    TruncatePipe
  ],
  imports: [CommonModule, AdminPageRoutingModule, LayoutModule, SharedModule]
})
export class AdminPageModule {}
