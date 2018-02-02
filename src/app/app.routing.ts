import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from 'app/register/register.component';
import { NopagefoundComponent } from 'app/shared/nopagefound/nopagefound.component';
import { Grafico1Component } from 'app/pages/grafico1/grafico1.component';
import { PagesComponent } from 'app/pages/pages.component';
import { DashboardComponent } from 'app/dashboard/dashboard.component';

export const routes: Routes = [
  // { path: '', component: PagesComponent,
  //   children: [
  //     { path: 'dashboard', component: DashboardComponent },
  //     { path: 'notfound', component: NopagefoundComponent },
  //     { path: 'grafico1', component: Grafico1Component},
  //     { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
  //   ]},

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NopagefoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
