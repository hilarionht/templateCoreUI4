import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// import { TabsModule } from 'ngx-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';

import { ChartsModule } from 'ng2-charts/ng2-charts';
// import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
// import { AsideToggleDirective } from './shared/aside.directive';
// import { BreadcrumbsComponent } from './shared/breadcrumb.component';

// Routing Module
import { AppRoutingModule } from './app.routing';
//Modulos

// import { SharedModule } from 'app/shared/shared.module';
import { PagesModule } from './pages/pages.module';

// Layouts
// import { FullLayoutComponent } from './layouts/full-layout.component';
import { LoginComponent } from './login/login.component';

// import { ProgressComponent } from './pages/progress/progress.component';
// import { Grafico1Component } from './pages/grafico1/grafico1.component';

import { RegisterComponent } from './register/register.component';
// import { PagesComponent } from './pages/pages.component';
// import { DashboardComponent } from 'app/dashboard/dashboard.component';



@NgModule({
  imports: [
    BrowserModule,
    PagesModule,
    // SharedModule,
    AppRoutingModule,
    // BsDropdownModule.forRoot(),
    // TabsModule.forRoot(),
    ChartsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    // FullLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    // SIDEBAR_TOGGLE_DIRECTIVES,
    // AsideToggleDirective,
    LoginComponent,
    // ProgressComponent,
    // Grafico1Component,
    RegisterComponent,
    // PagesComponent,
    // DashboardComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
