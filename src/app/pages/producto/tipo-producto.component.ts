import { Component, OnInit } from '@angular/core';
import { ProductoService, TipoProductoService } from '../../services/service.index';
import { Producto } from '../../models/producto.model';
import { TipoProducto } from 'app/models/tipoproducto.model';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tipo-producto',
  templateUrl: './tipo-producto.component.html',
  styles: []
})
export class TipoProductoComponent implements OnInit {

  tipoProductos: TipoProducto [] = [];
  public tipoproducto: TipoProducto = new TipoProducto('','');
  constructor(
    public activatedRoute: ActivatedRoute,
    public _tipoProductoService: TipoProductoService, 
    public router: Router) {
    
      activatedRoute.params.subscribe( params => {

      let id = params['id'];

      if ( id !== 'nuevo' ) {
        this.cargarTipoProducto( id );
      }

    });
   }

  ngOnInit() {
  }
  guardarTipoProducto( f: NgForm ) {

    console.log( f.valid );
    console.log( f.value );

    if ( f.invalid ) {
      return;
    }

    this._tipoProductoService.guardarTipoProducto( this.tipoproducto )
            .subscribe( tproducto => {

              this.tipoproducto._id = tproducto._id;

              this.router.navigate(['/tipoproductos']);

            });

  }
  cargarTipoProducto( id: string ) {
    this._tipoProductoService.obtenerTipoProducto(id).subscribe(
      tipoProd => {
        this.tipoproducto= tipoProd
      }
    );
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
    this._tipoProductoService.cargarTipoProductos(0)
            .subscribe( TipoProductoes => this.tipoProductos = TipoProductoes );
  }


  // guardarTipoProducto( tipoProducto: TipoProducto) {

  //   this._tipoProductoService.actualizartipoProducto( tipoProducto )
  //           .subscribe();

  // }

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
