import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarRoutingModule } from './sidebar-routing.module';
import { HeaderComponent } from '../header/header.component';
import { HomePageModule } from 'src/app/pages/home-page/home-page.module';
import { AdminPageModule } from 'src/app/pages/admin-page/admin-page.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SidebarComponent } from './sidebar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SidebarComponent, HeaderComponent],
  imports: [
    CommonModule,
    SidebarRoutingModule,
    RouterModule,
    SharedModule,
    HomePageModule,
    AdminPageModule
  ]
})
export class SidebarModule {}
