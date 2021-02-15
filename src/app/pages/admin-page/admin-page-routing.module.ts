import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPageComponent } from './admin-page.component';
import { VendorTableComponent } from './tables/vendor-table/vendor-table.component';
import { VendorFormComponent } from './forms/vendor-form/vendor-form.component';
import { OfficeFormComponent } from './forms/office-form/office-form.component';
import { OfferFormComponent } from './forms/offer-form/offer-form.component';
import { OfferTableComponent } from './tables/offer-table/offer-table.component';
import { OfficeTableComponent } from './tables/office-table/office-table.component';
import { VendorNavComponent } from './vendor-nav/vendor-nav.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    children: [
      {
        path: 'vendors',
        children: [
          {
            path: '',
            component: VendorTableComponent
          },
          {
            path: 'details',
            component: VendorNavComponent,
            children: [
              {
                path: 'form',
                component: VendorFormComponent
              },
              {
                path: ':id',
                component: VendorFormComponent
              },
              {
                path: ':id/offices',
                children: [
                  {
                    path: '',
                    component: OfficeTableComponent
                  },
                  {
                    path: 'form',
                    component: OfficeFormComponent
                  },
                  {
                    path: ':officeId',
                    component: OfficeFormComponent
                  }
                ]
              },
              {
                path: ':id/offers',
                children: [
                  {
                    path: '',
                    component: OfferTableComponent
                  },
                  {
                    path: 'form',
                    component: OfferFormComponent
                  },
                  {
                    path: ':offerId',
                    component: OfferFormComponent
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        path: 'offers',
        children: [
          {
            path: '',
            component: OfferTableComponent
          },
          {
            path: 'form',
            component: OfferFormComponent
          },
          {
            path: ':id',
            component: OfferFormComponent
          }
        ]
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
