import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Modelo } from '../../models/modelo.model';
import { ModeloService } from '../../services/service.index';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-modelos',
  templateUrl: './modelos.component.html',
  styles: []
})
export class ModelosComponent implements OnInit {

  desde: number = 0;
  public totalRegistros: number = 0;
  cargando: boolean = true;
  public modelos: Modelo [] = [];
  public productos : Producto [] = [];
  constructor(public _modeloService: ModeloService) {

   }

  ngOnInit() {
    this.cargarModelos();
  }

  buscarModelo( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarModelos();
      return;
    }
    this.cargando = true;
    this._modeloService.buscarModelo( termino )
            .subscribe( (modelo : Modelo[]) =>  this.modelos = modelo );
  }

  cargarModelos() {
    this._modeloService.cargarModelos(this.desde)
          .subscribe(
          ( resp: any ) =>{
          this.totalRegistros = resp.total;
          this.modelos = resp.modelo
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
    this.cargarModelos();

  }
  crearModelo() {
    swal({
      title: 'NUEVO MODELO',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      showLoaderOnConfirm: true,
      
      allowOutsideClick: () => !swal.isLoading()
    }).then((result) => {
      if (result.value) {
        this._modeloService.crearModelo( result.value )
                .subscribe( () => this.cargarModelos() );
      }
    })
  }
  guardarModelo( modelo: Modelo) {

    this._modeloService.actualizarModelo( modelo )
            .subscribe();

  }
  borrarModelo( modelo: Modelo ) {
    
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

        this._modeloService.eliminarModelo( modelo._id )
         .subscribe( () =>  this.cargarModelos() );  
      }
  });

  }
}

  
