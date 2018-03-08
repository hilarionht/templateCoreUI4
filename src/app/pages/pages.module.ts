//PIPES

import { PipesModule } from './../pipes/pipes.module';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PagesComponent } from 'app/pages/pages.component';
import { Grafico1Component } from './grafico1/grafico1.component';
import { ProgressComponent } from './progress/progress.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { DashboardComponent } from 'app/dashboard/dashboard.component';
import { SIDEBAR_TOGGLE_DIRECTIVES } from '../shared/sidebar.directive';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ServiceModule } from '../services/service.module';
import { ProductoComponent } from './producto/producto.component';
import { ProfileComponent } from './profile/profile.component';
import { TipoProductoComponent } from './producto/tipo-producto.component';
import { ProductosComponent } from './producto/productos.component';

@NgModule({
    declarations:[
        PagesComponent,
        ProgressComponent,
        Grafico1Component,
        DashboardComponent,
        ProductoComponent,
        ProfileComponent,
        TipoProductoComponent,
        ProductosComponent
    ],
    exports:[
        PagesComponent,
        ProgressComponent,
        Grafico1Component,
        DashboardComponent
    ],
    imports:[
        CommonModule,
        SharedModule,
        ServiceModule,
        BsDropdownModule.forRoot(),
        TabsModule.forRoot(),
        PAGES_ROUTES,
        FormsModule,
        ReactiveFormsModule,
        PipesModule
    ],
    providers:[]
})
export class PagesModule { }