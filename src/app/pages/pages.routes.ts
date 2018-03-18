import { ProfileComponent } from './profile/profile.component';
import { TipoProductosComponent } from './producto/tipo-productos.component';
import { ProductosComponent } from './producto/productos.component';
import { ProductoComponent } from './producto/producto.component';
import { LoginGuard } from './../services/guards/login.guard';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from 'app/pages/pages.component';
import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { NopagefoundComponent } from 'app/shared/nopagefound/nopagefound.component';
import { Grafico1Component } from 'app/pages/grafico1/grafico1.component';
import { TipoProductoComponent } from './producto/tipo-producto.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const pagesRoutes: Routes =[
    { path: '', component: PagesComponent,
         canActivate: [ LoginGuard] ,
        children: [
          { path: 'dashboard', component: DashboardComponent },
          { path: 'notfound', component: NopagefoundComponent },
          
          { path: 'profile', component: ProfileComponent },
          //mantenimiento
          { path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Mantenimiento de Usuario' } },
          
          { path: 'grafico1', component: Grafico1Component },
          { path: 'producto/:id', component: ProductoComponent },
          { path: 'productos', component: ProductosComponent },
          { path: 'tipoproducto/:id', component: TipoProductoComponent },
          { path: 'tipoproductos', component: TipoProductosComponent },
          { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
}

];
export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);