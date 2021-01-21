import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home-page/home-page.module')
        .then(m => m.HomePageModule)
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin-page/admin-page.module')
        .then(m => m.AdminPageModule)
  },
  { 
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
