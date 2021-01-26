import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared/shared.module';
import { SidebarModule } from './navigation/sidebar/sidebar.module';
import { LogInPageModule } from './pages/log-in/log-in.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    SidebarModule,
    LogInPageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
