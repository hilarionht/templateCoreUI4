import { ProductosComponent } from './producto/productos.component';
import { ProductoComponent } from './producto/producto.component';
import { LoginGuard } from './../services/guards/login.guard';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from 'app/pages/pages.component';
import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { NopagefoundComponent } from 'app/shared/nopagefound/nopagefound.component';
import { Grafico1Component } from 'app/pages/grafico1/grafico1.component';

const pagesRoutes: Routes =[
    { path: '', component: PagesComponent,
         canActivate: [ LoginGuard] ,
        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'notfound', component: NopagefoundComponent },
          { path: 'grafico1', component: Grafico1Component },
          { path: 'producto/:id', component: ProductoComponent },
          { path: 'productos', component: ProductosComponent },
          { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
}

];
export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);