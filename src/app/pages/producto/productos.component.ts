import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ProductoService } from '../../services/service.index';
import { Producto } from '../../models/producto.model';
// declare var swal: any;
import swal from 'sweetalert2'

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: []
})
export class ProductosComponent implements OnInit {

  desde: number = 0;
  public totalRegistros: number = 0;
  cargando: boolean = true;

  public productos: Producto [] = [];
  constructor(
    public _productoService: ProductoService) { }

  
  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this._productoService.cargarProductos(this.desde)
          .subscribe(
          ( resp: any ) =>{
          this.totalRegistros = resp.total;
          this.productos = resp.productos
        });
  }

  buscarProducto( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarProductos();
      return;
    }
    this.cargando = true;
    this._productoService.buscarProducto( termino )
            .subscribe( (productos : Producto[]) =>  this.productos = productos );
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
    this.cargarProductos();

  }

  borrarProducto( producto: Producto ) {
    swal({
      title: "¿Está seguro?",
      html: 'Está a punto de borrar a <p> ' + producto.nombre + '</p>',
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
      //confirmButtonColor: "#DD6B55",
     
      //closeOnConfirm: false
  }).then((result) => {
      if (result.value) {
        this._productoService.eliminarProducto( producto._id )
         .subscribe( () =>  this.cargarProductos() );  
      }
  });

  }

}
