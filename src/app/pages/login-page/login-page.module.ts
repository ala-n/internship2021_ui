import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { LogInComponent } from './login-page.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { SharedModule } from '@shared/shared.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [LogInComponent],
  imports: [CommonModule,
            SharedModule,
            RouterModule,
            BrowserModule,
            AppRoutingModule,
            HttpClientModule,
            JwtModule.forRoot({
              config: {
                tokenGetter: function  tokenGetter() {
                     return     localStorage.getItem('access_token');}, // session Storage token
                allowedDomains: ['localhost:4200'], 
                disallowedRoutes: ['http://localhost:4200/login']
              }
            })]
})
export class LogInPageModule {
  

}
