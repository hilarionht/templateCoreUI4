
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import { Producto } from '../../models/producto.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import swal from 'sweetalert2'

@Injectable()
export class ProductoService {
  totalProductos: number = 0;
  usuario: Usuario;
  token: string;
  constructor(  public http: HttpClient, 
                public router: Router, 
                public _usuarioService:UsuarioService ) { }

  cargarProductos(desde: number = 0) { 
    let url = URL_SERVICIOS + '/producto?desde='+ desde;
    return this.http.get( url );
  
  }
  obtenerProducto(id: string){
    let url = URL_SERVICIOS + '/producto/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.get( url )
              .map( (resp: any) => resp.producto );
  }
  buscarProducto( termino: string ) {

    let url = URL_SERVICIOS + '/search/coleccion/productos/' + termino;
    console.log(url);
    
    return this.http.get( url )
                .map( (resp: any) => resp.productos );

  }
  guardarProducto( producto: Producto ) {

    let url = URL_SERVICIOS + '/producto';

    if ( producto._id ) {
      // actualizando
      url += '/' + producto._id;
      url += '?token=' + this._usuarioService.token;
     
      
      return this.http.put( url, producto )
                .map( (resp: any) => {
                  swal('Producto Actualizado', producto.nombre, 'success');
                  return resp.producto;
                });

    }else {
      // creando
      url += '?token=' + this._usuarioService.token;
      
      return this.http.post( url, producto )
              .map( (resp: any) => {
                swal('Producto Creado', producto.nombre, 'success');
                return resp.producto;
               
              });
    }
  }

  eliminarProducto( id: string){
    let url = URL_SERVICIOS + '/producto/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete( url )
              .map( resp => {
                swal( {title: 'Producto Borrado', html: 'Producto borrado correctamente',type: 'success' , timer: 1500});
                return resp;
              });
  }
}
