import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPageComponent } from './admin-page.component';
import { VendorTableComponent } from './tables/vendor-table/vendor-table.component';
import { VendorFormComponent } from './forms/vendor-form/vendor-form.component';
import { OfficeFormComponent } from './forms/office-form/office-form.component';
import { OfferFormComponent } from './forms/offer-form/offer-form.component';
import { OfferTableComponent } from './tables/offer-table/offer-table.component';
import { OfficeTableComponent } from './tables/office-table/office-table.component';

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
        path: 'vendors/form',
        component: VendorFormComponent
      },
      {
        path: 'vendors/:id',
        component: VendorFormComponent
      },
      {
        path: 'offers',
        component: OfferTableComponent
      },
      {
        path: 'offers/form',
        component: OfferFormComponent
      },
      {
        path: 'offers/:id',
        component: OfferFormComponent
      },
      {
        path: 'vendors/:id/offices',
        component: OfficeTableComponent
      },
      {
        path: 'vendors/:id/offers',
        component: OfferTableComponent
      },
      {
        path: 'vendors/:id/offers/form',
        component: OfferFormComponent
      },
      {
        path: 'vendors/:id/offers/:offerId',
        component: OfferFormComponent
      },
      {
        path: 'vendors/:id/offices/form',
        component: OfficeFormComponent
      },
      {
        path: 'vendors/:id/offices/:officeId', //TODO optimize routing
        component: OfficeFormComponent
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
