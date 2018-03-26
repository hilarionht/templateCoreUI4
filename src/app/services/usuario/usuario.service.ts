
import { SubirArchivoService } from './../subir-archivo/subir-archivo.service';
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http'
import { URL_SERVICIOS } from '../../config/config';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';//(immportar solo lo que se use)
import 'rxjs/add/operator/catch';//(immportar solo lo que se use)

import { Router } from '@angular/router';
import swal from 'sweetalert2'


@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;
  

  constructor( 
    public http: HttpClient, 
    public router: Router,
    public _subirArchivoService: SubirArchivoService
   ) {
     this.cargarStorage();
   }

   isAuthenticated() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {
    if( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }else{
      this.token = '';
      this.usuario = null;
    }
  }

  
  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
  crearUsuario( usuario: Usuario ) {
  
    let url = URL_SERVICIOS + '/usuario';
   
    
    return this.http.post(url, usuario)
      .map((res: any) => {

        swal('Usuario Creado', usuario.email, 'success');
        return res.usuario;
      });
  }

  guardarStorage(id: string, token: string, usuario: Usuario ){
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }

  loginGoogle( token: string ) {
    let url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, { token })
                .map( (resp: any) => {
                  this.guardarStorage(resp.id, resp.token, resp.usuario );
                  return true;
                });
  }

  login(usuario: Usuario){
    let url = URL_SERVICIOS + '/login';
    return this.http.post(url,usuario)
              .map( (resp: any) => {
                console.log( resp );
                
                this.guardarStorage(resp.id, resp.token, resp.usuario );
                return true;
              }).catch( err => {
                console.log(err.error.mensaje);
                swal( 'Error en el login', err.error.mensaje, 'error' );
                return Observable.throw( err );
              });
  }
  
  actualizarUsuario( usuario: Usuario ) {

    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put( url, usuario )
                .map( (resp: any) => {

                  if ( usuario._id === this.usuario._id ) {
                    let usuarioDB: Usuario = resp.usuario;
                    this.guardarStorage( usuarioDB._id, this.token, usuarioDB );
                  }

                  swal('Usuario actualizado', usuario.nombre, 'success' );

                  return true;
                });

  }
  cambiarImagen( archivo: File, id: string ) {

    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )
          .then( (resp: any) => {

            this.usuario.img = resp.usuario.img;
            swal( 'Imagen Actualizada', this.usuario.nombre, 'success' );
            this.guardarStorage( id, this.token, this.usuario );

          })
          .catch( resp => {
            console.log( resp );
          }) ;

  }

  cargarUsuarios( desde: number = 0 ) {
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get( url );
  }

  buscarUsuarios( termino: string ) {

    let url = URL_SERVICIOS + '/search/coleccion/usuarios/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.usuarios );

  }

  borrarUsuario( id: string ) {
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;
    return this.http.delete( url )
                .map( resp => {
                  swal('Usuario borrado', 'El usuario a sido eliminado correctamente', 'success');
                  return true;
                });

  }
  renuevaToken(){
    let url = URL_SERVICIOS + '/login/renuevatoken';
    url+= '?token'+ this.token;
    return this.http.get( url ).map(
      ( resp: any)=> {
        this.token = resp.token;
        localStorage.setItem('token',this.token);
        return true;
      }
    ).catch(err => {
      this.router.navigate(['/login']);
      return Observable.throw(err);
    });
  }

}
