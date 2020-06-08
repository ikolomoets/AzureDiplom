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
import { MainMapComponent } from './main-map/main-map.component';
import { AddEventComponent } from './add-event/add-event.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { AgmCoreModule } from '@agm/core';
import { TabsModule } from './shared/tabs/tabs.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './auth.guard';
import { CalcLossComponent } from './calc-loss/calc-loss.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    MainMapComponent,
    AddEventComponent,
    CalcLossComponent
  ],
  imports: [
    AccountModule,
    DashboardModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    SlickCarouselModule,
    TabsModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyApasCXaCKWjpidhK9F0EJTHP1UZ1Cfm2w',
      libraries: ['places']
    }),
    RouterModule.forRoot([
      { path: '',   redirectTo: '/map', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'map', component: MainMapComponent },
      { path: 'add-event', component: AddEventComponent},
      { path: 'calc-loss', component: CalcLossComponent },

      { path: 'account', loadChildren: './account/account.module#AccountModule' },
      { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
    ])
  ],
  providers: [ConfigService, 
    {
    provide: HttpXhrBackend,
    useClass: AuthenticateXHRBackend
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
