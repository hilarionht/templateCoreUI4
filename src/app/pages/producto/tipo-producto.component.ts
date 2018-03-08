import { Component, OnInit } from '@angular/core';
import { ProductoService, TipoProductoService } from '../../services/service.index';
import { Producto } from '../../models/producto.model';
import { TipoProducto } from 'app/models/tipoproducto.model';

@Component({
  selector: 'app-tipo-producto',
  templateUrl: './tipo-producto.component.html',
  styles: []
})
export class TipoProductoComponent implements OnInit {

  tipoProductos: TipoProducto [] = [];
  constructor(public _tipoProductoService: TipoProductoService) { }

  ngOnInit() {
  }


  buscarTipoProducto( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarTipoProductos();
      return;
    }

    this._tipoProductoService.buscarTipoProducto( termino )
            .subscribe( tipoProductos => this.tipoProductos = tipoProductos );

  }

  cargarTipoProductos() {
    this._tipoProductoService.cargarTipoProductos()
            .subscribe( TipoProductoes => this.tipoProductos = TipoProductoes );
  }


  guardarTipoProducto( tipoProducto: TipoProducto) {

    this._tipoProductoService.actualizartipoProducto( tipoProducto )
            .subscribe();

  }

  borrarTipoProducto( TipoProducto: TipoProducto ) {

    this._tipoProductoService.eliminarTipoProducto( TipoProducto._id )
            .subscribe( () =>  this.cargarTipoProductos() );

  }

  crearTipoProducto() {

    // swal({
    //   title: 'Crear Tipo de Producto',
    //   text: 'Ingrese el nombre del Tipo de Producto',
    //   content: 'input',
    //   icon: 'info',
    //   buttons: true,
    //   dangerMode: true
    // }).then( (valor: string ) => {

    //   if ( !valor || valor.length === 0 ) {
    //     return;
    //   }

    //   this._tipoProductoService.guardarTipoProducto( valor )
    //           .subscribe( () => this.cargarTipoProductos() );

    // });

  }
}
