import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPageComponent } from './admin-page.component';
import { VendorTableComponent } from './tables/vendor-table/vendor-table.component';
import { VendorFormComponent } from './forms/vendor-form/vendor-form.component';
import { OfficeFormComponent } from './forms/office-form/office-form.component';
import { OfferFormComponent } from './forms/offer-form/offer-form.component';
import { OfferTableComponent } from './tables/offer-table/offer-table.component';
import { OfficeTableComponent } from './tables/office-table/office-table.component';
import { VendorNavComponent } from './navigation/vendor-nav/vendor-nav.component';
import { VendorStatTableComponent } from './tables/vendor-stat-table/vendor-stat-table.component';
import { TagsStatTableComponent } from './tables/tags-stat-table/tags-stat-table.component';
import { OfferStatTableComponent } from './tables/offer-stat-table/offer-stat-table.component';
import { StatNavComponent } from './navigation/stat-nav/stat-nav.component';
import { FormGuard } from '@shared/guards/form.guard';

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
            path: 'details/:id/offices/form',
            component: OfficeFormComponent
          },
          {
            path: 'details/:id/offices/:officeId',
            component: OfficeFormComponent
          },
          {
            path: 'details/:id/offers/form',
            component: OfferFormComponent
          },
          {
            path: 'details/:id/offers/:offerId',
            component: OfferFormComponent
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
                children: [
                  {
                    path: 'edit',
                    component: VendorFormComponent
                  },
                  {
                    path: 'offices',
                    children: [
                      {
                        path: '',
                        component: OfficeTableComponent,
                        canActivate: [FormGuard]
                      }
                    ]
                  },
                  {
                    path: 'offers',
                    children: [
                      {
                        path: '',
                        component: OfferTableComponent,
                        canActivate: [FormGuard]
                      }
                    ]
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
            path: ':offerId',
            component: OfferFormComponent
          }
        ]
      },
      {
        path: 'statistics',
        children: [
          {
            path: '',
            component: StatNavComponent,
            children: [
              {
                path: 'vendors',
                component: VendorStatTableComponent
              },
              {
                path: 'offers',
                component: OfferStatTableComponent
              },
              {
                path: 'tags',
                component: TagsStatTableComponent
              }
            ]
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
  exports: [RouterModule],
  providers: [FormGuard]
})
export class AdminPageRoutingModule {}
