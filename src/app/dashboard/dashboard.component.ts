import { FacturaService } from './../services/factura/factura.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent {

  constructor(
    public _facturaService : FacturaService
   ) { 

    this._facturaService.getFrete().subscribe(resp => {
      console.log(resp);
      
    })
   }

}
