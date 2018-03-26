import { Injectable } from '@angular/core';
import { Producto } from './../../models/producto.model';
import { TipoProducto } from '../../models/tipoproducto.model';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario/usuario.service';
import swal from 'sweetalert2'

@Injectable()
export class TipoProductoService {

  
  totalTipoProductos: number = 0;

  constructor( 
    public http: HttpClient, 
    public router: Router, 
    public _usuarioService:UsuarioService ) { 

    }
  
  crearTipoProducto( nombre: string ) {

    let url = URL_SERVICIOS + '/tipo-producto';
    url += '?token=' + this._usuarioService.token;

    return this.http.post( url, { nombre } )
              .map( (resp: any) => resp.producto );

  }

  agregarTipoProducto(tipoProducto: TipoProducto, _id: string) {
    let url = URL_SERVICIOS + '/tipo-producto';
    return this.http.post(url, tipoProducto)
                    .map((res: any) => {
                      swal('Tipo de Producto Creado', tipoProducto.nombre, 'success');
                      return res.tipoProducto;
                    });
  }

  cargarTipoProductos(desde: number=0,limite: number=0) { 
    let url = URL_SERVICIOS + '/tipo-producto?desde='+ desde + '&limite='+limite;
//  console.log(url);
 
    return this.http.get( url ).map( (resp : any) => {
        this.totalTipoProductos = resp.total;
        return resp;
     });
  }

  obtenerTipoProducto(id: string){
    let url = URL_SERVICIOS + '/tipo-producto/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.get( url )
              .map( (resp: any) => resp.tipoProducto );
  }

  buscarTipoProducto( termino: string ) {

    let url = URL_SERVICIOS + '/search/coleccion/tipoproductos/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.tipoproductos );

  }

  guardarTipoProducto( tipoProducto: TipoProducto ) {

    let url = URL_SERVICIOS + '/tipo-producto';

    if ( tipoProducto._id ) {
      // actualizando
      url += '/' + tipoProducto._id;
      url += '?token=' + this._usuarioService.token;
     
      
      return this.http.put( url, tipoProducto )
                .map( (resp: any) => {
                  swal('Producto Actualizado', tipoProducto.nombre, 'success');
                  return resp.tipoProducto;
                });

    }else {
      // creando
      url += '?token=' + this._usuarioService.token;
      
      return this.http.post( url, tipoProducto )
              .map( (resp: any) => {
                swal('Producto Creado', tipoProducto.nombre, 'success');
                return resp.tipoProducto;
               
              });
    }
  }

  eliminarTipoProducto( id: string){
    let url = URL_SERVICIOS + '/tipo-producto/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete( url )
              .map( resp => {
                swal( 'Tipo de Producto Borrado', 'Producto borrado correctamente', 'success' );
                return resp;
              });
  }

  actualizartipoProducto( tipoProducto: TipoProducto ) {

    let url = URL_SERVICIOS + '/tipo-producto/' + tipoProducto._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, tipoProducto )
              .map( (resp: any) => {

                swal('Tipo de Producto Actualiado', tipoProducto.nombre, 'success');
                return resp.tipoProducto;
              });

  }
}
