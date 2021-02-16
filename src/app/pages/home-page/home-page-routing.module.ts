import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page.component';
import { OfferItemPageComponent } from './offer-item-page/offer-item-page.component';
import { OfferListPageComponent } from './offer-list-page/offer-list-page.component';
import { VendorItemPageComponent } from './vendor-item-page/vendor-item-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    children: [
      { path: '', component: OfferListPageComponent },
      { path: 'offers/:id', component: OfferItemPageComponent },
      { path: 'vendors/:id', component: VendorItemPageComponent }
    ]
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
