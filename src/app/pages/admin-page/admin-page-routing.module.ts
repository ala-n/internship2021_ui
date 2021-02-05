import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminPageComponent } from './admin-page.component';
import { TableComponent } from './admin-table/table.component';
import { VendorFormComponent } from './vendor-form/vendor-form.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent,
    children: [
      {
        path: 'vendors',
        component: TableComponent
      },
      {
        path: 'form',
        component: VendorFormComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: 'vendors',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPageRoutingModule {}
