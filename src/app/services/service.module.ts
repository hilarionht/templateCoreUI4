import { TipoProductoService } from './producto/tipo-producto.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    UsuarioService,
    SharedService,
    SidebarService,
    LoginGuard,
    ProductoService } from './service.index';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    imports:[
        CommonModule,
        HttpClientModule
    ],
    providers: [
        UsuarioService,
        SharedService,
        SidebarService,
        LoginGuard,
        ProductoService,
        TipoProductoService,
        ProductoService
    ],
    declarations:[]
})
export class ServiceModule{}