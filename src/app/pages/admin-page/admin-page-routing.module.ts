import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPageComponent } from './admin-page.component';
import { VendorTableComponent } from './tables/vendor-table/vendor-table.component';
import { VendorFormComponent } from './forms/vendor-form/vendor-form.component';
import { OfficeFormComponent } from './forms/office-form/office-form.component';
import { OfferFormComponent } from './forms/offer-form/offer-form.component';
import { OfferTableComponent } from './tables/offer-table/offer-table.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    children: [
      {
        path: 'vendors',
        component: VendorTableComponent
      },
      {
        path: 'vendors/:id',
        component: VendorFormComponent
      },
      {
        path: 'vendor-form',
        component: VendorFormComponent
      },
      {
        path: 'offers',
        component: OfferTableComponent
      },
      {
        path: 'office-form',
        component: OfficeFormComponent
      },
      {
        path: 'offices/:id',
        component: OfficeFormComponent
      },
      {
        path: 'offer-form',
        component: OfferFormComponent
      },
      {
        path: 'offers/:id',
        component: OfferFormComponent
      },
      {
        path: '',
        redirectTo: 'vendors',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPageRoutingModule {}
