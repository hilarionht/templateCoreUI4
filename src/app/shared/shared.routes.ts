import {RouterModule, Routes } from '@angular/router';
import { PagesComponent } from 'app/pages/pages.component';
import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { NopagefoundComponent } from 'app/shared/nopagefound/nopagefound.component';
import { Grafico1Component } from 'app/pages/grafico1/grafico1.component';

const sharedRoutes: Routes =[
    { path: '', component: PagesComponent,
        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'notfound', component: NopagefoundComponent },
          { path: 'grafico1', component: Grafico1Component},
          { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
}

];
export const SHARED_ROUTES = RouterModule.forChild(sharedRoutes);