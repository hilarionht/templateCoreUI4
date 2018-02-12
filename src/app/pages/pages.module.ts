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

@NgModule({
    declarations:[
        PagesComponent,
        ProgressComponent,
        Grafico1Component,
        DashboardComponent
    ],
    exports:[
        PagesComponent,
        ProgressComponent,
        Grafico1Component,
        DashboardComponent
    ],
    imports:[
        SharedModule,
        BsDropdownModule.forRoot(),
        TabsModule.forRoot(),
        PAGES_ROUTES
    ]
})
export class PagesModule { }