import {  MarcaService, 
          ModeloService, 
          TipoProductoService, 
          ProductoService} from './../../services/service.index';

import { TipoProducto } from 'app/models/tipoproducto.model';
import { Modelo } from '../../models/modelo.model';
import { Marca } from '../../models/marca.model';
import { Producto } from '../../models/producto.model';

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert2'
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
  marcas: Marca []= [];
  modelos: Modelo []= [];
  constructor(
    public activatedRoute: ActivatedRoute,
    public _productoService: ProductoService,
    public _tipoProdService: TipoProductoService,
    public _modeloService: ModeloService,
    public _marcaService: MarcaService,
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
      marca: new FormControl(null),
      modelo: new FormControl(null),
      _id: new FormControl(null)
    });
    this._tipoProdService.cargarTipoProductos()
                         .subscribe( tipoProductos => this.tipoProductos = tipoProductos.tipoProducto);
    this._marcaService.cargarMarcas()
                         .subscribe( marcas => this.marcas = marcas.marca);
    //this.cargarModelos(this.producto.marca)                      
   
  }
  cargarTipoProducto(){
    this._tipoProdService.cargarTipoProductos()
    .subscribe( tipoProductos => {this.tipoProductos = tipoProductos.tipoProducto;});
  }
  cargarProducto( id: string ) {
    
    this._productoService.obtenerProducto( id )
          .subscribe( producto => {
            this.forma.reset();
            this.forma.setValue({
              nombre: producto.nombre,
              tipoProducto: producto.tipoProducto._id,
              precioCompra: producto.precioCompra,
              precioVenta: producto.precioVenta,
              fechaUltimoPrecio : producto.fechaUltimoPrecio,
              cantidad: producto.cantidad,
              cantidadAdvertencia: producto.cantidadAdvertencia,
              descripcion: producto.descripcion,
              marca: producto.marca,
              modelo: producto.modelo,
              _id: producto._id
            });
            this.cargarModelos(producto.marca);
          });
  }
  cargarModelos(id:string){
 
    this._modeloService.cargarModelosById(id)
    .subscribe( modelos => this.modelos = modelos.modelosbyid);
  }
  registrarProducto() {
    
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
      this.forma.value.marca,
      this.forma.value.modelo,
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
