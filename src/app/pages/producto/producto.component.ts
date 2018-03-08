import { TipoProductoService } from './../../services/producto/tipo-producto.service';
import { TipoProducto } from 'app/models/tipoproducto.model';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert2'
import { Producto } from '../../models/producto.model';
import { ProductoService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles: []
})
export class ProductoComponent implements OnInit {
  
  public producto:Producto;
  public forma: FormGroup;
  tipoProductos: TipoProducto []= [];
  constructor(
    public activatedRoute: ActivatedRoute,
    public _productoService: ProductoService,
    public _tipoProdService: TipoProductoService,
    public router: Router) {
                activatedRoute.params.subscribe( params => {

                  let id = params['id'];
            
                  if ( id !== 'nuevo' ) {
                    this.cargarProducto( id );
                  }
            
                });
               }
  ngOnInit(): void {
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      tipoProducto: new FormControl(null, Validators.required),
      precioCompra: new FormControl(null, Validators.required),
      precioVenta: new FormControl(null, Validators.required),
      fechaUltimoPrecio: new FormControl(null),
      cantidad: new FormControl(null, Validators.required),
      cantidadAdvertencia: new FormControl(null, Validators.required),
      descripcion: new FormControl(null),
      _id: new FormControl(null)
    });
    this._tipoProdService.cargarTipoProductos()
                         .subscribe( tipoProductos => this.tipoProductos = tipoProductos);
  }
  cargarTipoProducto(){
    this._tipoProdService.cargarTipoProductos()
    .subscribe( tipoProductos => this.tipoProductos = tipoProductos);
  }
  cargarProducto( id: string ) {
    this._productoService.obtenerProducto( id )
          .subscribe( producto => {
            this.forma.reset();
            console.log( producto );
            this.forma.setValue({
              nombre: producto.nombre,
              tipoProducto: producto.tipoProducto._id,
              precioCompra: producto.precioCompra,
              precioVenta: producto.precioVenta,
              fechaUltimoPrecio : producto.fechaUltimoPrecio,
              cantidad: producto.cantidad,
              cantidadAdvertencia: producto.cantidadAdvertencia,
              descripcion: producto.descripcion,
              _id: producto._id
            });
            console.log(this.forma);
            
          });
  }
  registrarProducto() {
    console.log(this.forma);
    
    if(this.forma.invalid){
      return;
    }
    let producto = new Producto(
      this.forma.value.nombre,
      this.forma.value.tipoProducto,
      this.forma.value.precioCompra,
      this.forma.value.precioVenta,
      this.forma.value.cantidad,
      this.forma.value.fechaUltimoPrecio,
      this.forma.value.cantidadAdvertencia,
      this.forma.value.descripcion,
      this.forma.value._id
      
    );
    this._productoService.guardarProducto(producto)
                        .subscribe(resp => { this.router.navigate(['/productos'])});
  }
  crearTipoProducto() {
    swal({
      title: 'NUEVO TIPO DE PRODUCTO',
      input: 'text',
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      showLoaderOnConfirm: true,
      
      allowOutsideClick: () => !swal.isLoading()
    }).then((result) => {
      if (result.value) {
        this._tipoProdService.crearTipoProducto( result.value )
                .subscribe( () => this.cargarTipoProducto() );
      }
    })
  }
}
