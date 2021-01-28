import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidenavRoutingModule } from './sidenav-routing.module';
import { HeaderComponent } from '../header/header.component';
import { HomePageModule } from 'src/app/pages/home-page/home-page.module';
import { AdminPageModule } from 'src/app/pages/admin-page/admin-page.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SidenavComponent } from './sidenav.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SidenavComponent, HeaderComponent],
  imports: [
    CommonModule,
    SidenavRoutingModule,
    RouterModule,
    SharedModule,
    HomePageModule,
    AdminPageModule
  ]
})
export class SidenavModule {}
