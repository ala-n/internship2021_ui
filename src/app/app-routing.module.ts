import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './pages/log-in/log-in.component';

const routes: Routes = [
  {
    path: 'login',
    component: LogInComponent
  },
  {
    path: '',
    loadChildren: () =>
      import('./navigation/sidenav/sidenav.module').then((m) => m.SidenavModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
