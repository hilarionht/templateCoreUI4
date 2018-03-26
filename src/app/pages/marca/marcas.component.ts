import { Component, OnInit } from '@angular/core';

import { Producto } from '../../models/producto.model';
import swal from 'sweetalert2';
import { Marca } from '../../models/marca.model';
import { MarcaService } from '../../services/service.index';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styles: []
})
export class MarcasComponent implements OnInit {
  desde: number = 0;
  public totalRegistros: number = 0;
  cargando: boolean = true;
  public marcas: Marca [] = [];
  public productos : Producto [] = [];
  constructor(public _marcaService: MarcaService) {

   }

  ngOnInit() {
    this.cargarMarcas();
  }

  buscarMarca( termino: string ) {
    if ( termino.length <= 0 ) {
      this.cargarMarcas();
      return;
    }
    this.cargando = true;
    this._marcaService.buscarMarca( termino )
            .subscribe( (marcas: Marca[]) =>  {
              this.cargando = false;
              this.marcas = marcas;
              console.log('component',marcas);
              
            });
  }

  cargarMarcas() {
    this._marcaService.cargarMarcas(this.desde,5)
          .subscribe(
          ( resp: any ) =>{
          this.totalRegistros = this._marcaService.totalMarcas;
          this.marcas = resp.marca
        });
  }
  cambiarDesde( valor: number ) {

    let desde = this.desde + valor;

    if ( desde >= this.totalRegistros ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarMarcas();

  }
  crearMarca() {
    swal({
      title: 'NUEVO MODELO',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      showLoaderOnConfirm: true,
      
      allowOutsideClick: () => !swal.isLoading()
    }).then((result) => {
      if (result.value) {
        this._marcaService.crearMarca( result.value )
                .subscribe( () => this.cargarMarcas() );
      }
    })
  }

  guardarMarca( marca: Marca) {

    this._marcaService.actualizarmarca( marca )
            .subscribe();

  }
  borrarMarca( modelo: Marca ) {
    
    swal({
      title: "¿Está seguro?",
      html: 'Está a punto de borrar a <p> ' + modelo.nombre + '</p>',
      type: "warning",
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
  }).then((result) => {
      if (result.value) {

        this._marcaService.eliminarMarca( modelo._id )
         .subscribe( () =>  this.cargarMarcas() );  
      }
  });

  }
}

  
