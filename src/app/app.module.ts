import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';

import { ChartsModule } from 'ng2-charts/ng2-charts';

// Routing Module
import { AppRoutingModule } from './app.routing';
//Modulos

// import { SharedModule } from 'app/shared/shared.module';
import { PagesModule } from './pages/pages.module';

// Layouts

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

//servicios
import { ServiceModule } from './services/service.module';



@NgModule({
  imports: [
    BrowserModule,
    PagesModule,
    AppRoutingModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule
  ],
  declarations: [
    AppComponent,
    NAV_DROPDOWN_DIRECTIVES,
    LoginComponent,
    RegisterComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
