import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpXhrBackend } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AccountModule } from './account/account.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { ConfigService } from './shared/utils/config.service';
import { AuthenticateXHRBackend } from './authenticate-xhr.backend';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
  ],
  imports: [
    AccountModule,
    DashboardModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'account', loadChildren: './account/account.module#AccountModule' },
    ])
  ],
  providers: [ConfigService, { 
    provide: HttpXhrBackend, 
    useClass: AuthenticateXHRBackend}],
  bootstrap: [AppComponent]
})
export class AppModule { }
