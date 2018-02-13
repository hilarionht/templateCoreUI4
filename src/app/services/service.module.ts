import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { 
    UsuarioService, 
    SharedService, 
    SidebarService } from "./service.index";
import { HttpClientModule } from "@angular/common/http";


@NgModule({
    imports:[
        CommonModule, 
        HttpClientModule
    ],
    providers:[
        UsuarioService,
        SharedService,
        SidebarService
    ],
    declarations:[]
})
export class ServiceModule{}