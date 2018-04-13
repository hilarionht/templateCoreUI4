import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from 'app/register/register.component';
import { NopagefoundComponent } from 'app/shared/nopagefound/nopagefound.component';
import { PagesComponent } from 'app/pages/pages.component';
import { LoginGuard } from './services/service.index';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: '' , 
    component: PagesComponent , 
    canActivate: [LoginGuard], 
    loadChildren: './pages/pages.module#PagesModule'    
},
  { path: '**', component: NopagefoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
