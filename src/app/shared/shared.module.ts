import { ModalUploadComponent } from './../components/modal-upload/modal-upload.component';
import { PipesModule } from './../pipes/pipes.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { SidebarComponent } from 'app/shared/sidebar/sidebar.component';

import { BreadcrumbsComponent } from 'app/shared/breadcrumbs/breadcrumbs.component';

import { NopagefoundComponent } from 'app/shared/nopagefound/nopagefound.component';

import { SIDEBAR_TOGGLE_DIRECTIVES } from './sidebar.directive';
import { AsideToggleDirective } from './aside.directive';


@NgModule({
    imports: [
    RouterModule,
    CommonModule,
    PipesModule
    ],
    declarations: [
        SIDEBAR_TOGGLE_DIRECTIVES,
        AsideToggleDirective,
        HeaderComponent,
        FooterComponent,
        BreadcrumbsComponent,
        NopagefoundComponent,
        SidebarComponent,
        ModalUploadComponent
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        BreadcrumbsComponent,
        NopagefoundComponent,
        SidebarComponent,
        ModalUploadComponent
    ]
})
export class SharedModule { }