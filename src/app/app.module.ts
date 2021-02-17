import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LogInPageModule } from './pages/login-page/login-page.module';
import { SharedModule } from './shared/shared.module';
import { SidenavModule } from './navigation/sidenav/sidenav.module';
import { InMemoryDataService } from '@shared/services/in-memory-data.service';
import { environment } from 'src/environments/environment';

// TODO: replace with something more strict
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const imports: any[] = [
  AppRoutingModule,
  BrowserAnimationsModule,
  BrowserModule,
  HttpClientModule,
  LogInPageModule,
  SharedModule,
  SidenavModule
];

// Replace HttpClient with a test data provider
if (!environment.production) {
  imports.push(
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
      delay: 100
    })
  );
}

@NgModule({
  declarations: [AppComponent],
  imports,
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
