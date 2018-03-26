import { ModeloService } from './../../services/modelo/modelo.service';
import { Modelo } from './../../models/modelo.model';
import { Component, OnInit } from '@angular/core';
import { Marca } from '../../models/marca.model';
import { MarcaService } from '../../services/service.index';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modelo',
  templateUrl: './modelo.component.html',
  styles: []
})
export class ModeloComponent implements OnInit {

  public modelo:Modelo;
  marcas: Marca [] = [];
  constructor(
    public _marcaService:MarcaService , 
    public _modelService: ModeloService,
    public router: Router
  ) {

    this.modelo = new Modelo('','','','','');
    this._marcaService.cargarMarcas().subscribe( marcas=> this.marcas = marcas.marca );
    console.log(this.marcas);
    

   }

  ngOnInit() {
    
  }
  guardar( f: NgForm){
    if ( f.invalid ) {
      return;
    }

    this._modelService.guardarModelo( this.modelo )
            .subscribe( modelo => {

              this.modelo._id = modelo._id;

              this.router.navigate(['/modelos']);

            });
  }

}
