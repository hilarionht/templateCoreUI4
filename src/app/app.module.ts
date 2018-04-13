

import { SharedModule } from './shared/shared.module';
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
//import { PagesModule } from './pages/pages.module';

// Layouts

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

//servicios
import { ServiceModule } from './services/service.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { PagesComponent } from './pages/pages.component';

import { ToastrModule } from 'ngx-toastr';
import { AppSidebarMinimizerComponent } from './components/app-sidebar-minimizer/app-sidebar-minimizer.component';
import { ModalUploadComponent } from './components/modal-upload/modal-upload.component';
// Import directives

@NgModule({
   declarations: [
    AppComponent,
    NAV_DROPDOWN_DIRECTIVES,
    LoginComponent,
    RegisterComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
   // PagesModule,
    AppRoutingModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    SharedModule
    
  ],
 
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
