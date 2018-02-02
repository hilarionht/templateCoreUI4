import { NgModule } from '@angular/core';
import { SHARED_ROUTES } from 'app/shared/shared.routes';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { SidebarComponent } from 'app/shared/sidebar/sidebar.component';
import { BreadcrumbsComponent } from 'app/shared/breadcrumbs/breadcrumbs.component';
import { NopagefoundComponent } from 'app/shared/nopagefound/nopagefound.component';


@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        BreadcrumbsComponent,
        NopagefoundComponent,
        SidebarComponent
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        BreadcrumbsComponent,
        NopagefoundComponent,
        SidebarComponent
    ],
    imports:[
        SHARED_ROUTES
    ]
})
export class SharedModule { }