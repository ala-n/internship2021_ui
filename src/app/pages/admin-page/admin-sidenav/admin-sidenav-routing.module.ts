import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminSidenavComponent } from './admin-sidenav.component';

const routes: Routes = [
  {
    path: '',
    component: AdminSidenavComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminSidenavRoutingModule {}
