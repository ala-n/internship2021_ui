import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SidenavComponent } from './sidenav.component';

export const routes: Routes = [
  {
    path: '',
    component: SidenavComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../../pages/home-page/home-page.module').then(
            (m) => m.HomePageModule
          )
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('../../pages/admin-page/admin-page.module').then(
            (m) => m.AdminPageModule
          )
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SidenavRoutingModule {}
