import { Component, OnInit } from '@angular/core';
import { TipoProductoService } from '../../services/service.index';
import { TipoProducto } from '../../models/tipoproducto.model';
import swal from 'sweetalert2';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-tipo-productos',
  templateUrl: './tipo-productos.component.html'
})
export class TipoProductosComponent implements OnInit {

  desde: number = 0;
  public totalRegistros: number = 0;
  cargando: boolean = true;
  public tipoproductos: TipoProducto [] = [];
  public productos : Producto [] = [];
  constructor(public _tipoProdService: TipoProductoService) {

   }

  ngOnInit() {
    this.cargarTipoProductos();
  }

  buscarTipoProducto( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarTipoProductos();
      return;
    }
    this.cargando = true;
    this._tipoProdService.buscarTipoProducto( termino )
            .subscribe( (tipoproductos : TipoProducto[]) =>  this.tipoproductos = tipoproductos );
  }

  cargarTipoProductos() {
    this._tipoProdService.cargarTipoProductos(this.desde,5)
          .subscribe(
          ( resp: any ) =>{
          this.totalRegistros = resp.total;
          this.tipoproductos = resp.tipoProducto
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
    this.cargarTipoProductos();

  }

  borrarProducto( tipoproducto: TipoProducto ) {
    
    swal({
      title: "¿Está seguro?",
      html: 'Está a punto de borrar a <p> ' + tipoproducto.nombre + '</p>',
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

        this._tipoProdService.eliminarTipoProducto( tipoproducto._id )
         .subscribe( () =>  this.cargarTipoProductos() );  
      }
  });

  }
}
