import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CityLoadGuard } from '@shared/guards/cities-load.guard';
import { LogInComponent } from './pages/login-page/login-page.component';

const routes: Routes = [
  {
    path: 'login',
    component: LogInComponent
  },
  {
    path: '',
    canActivate: [AuthGuard, CityLoadGuard],
    loadChildren: () =>
      import('./navigation/sidenav/sidenav.module').then((m) => m.SidenavModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
