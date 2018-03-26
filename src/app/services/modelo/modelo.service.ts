import { Injectable, ViewContainerRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuarioService } from 'app/services/usuario/usuario.service';
import { URL_SERVICIOS } from '../../config/config';
import { Modelo } from '../../models/modelo.model';
import swal from 'sweetalert2';


@Injectable()
export class ModeloService {

  totalModelos: number = 0;

  constructor( 
    public http: HttpClient, 
    public router: Router, 
    public _usuarioService:UsuarioService
  ) { 
    
    }
  
  crearModelo( nombre: string ) {

    let url = URL_SERVICIOS + '/modelo';
    url += '?token=' + this._usuarioService.token;

    return this.http.post( url, { nombre } )
              .map( (resp: any) => resp.producto );

  }

  agregarModelo(modelo: Modelo, _id: string) {
    let url = URL_SERVICIOS + '/modelo';
    return this.http.post(url, modelo)
                    .map((res: any) => {
                      swal('Modelo Creado', modelo.nombre, 'success');
                      return res.modelo;
                    });
  }

  cargarModelos(desde: number=0) { 
    let url = URL_SERVICIOS + '/modelo?desde='+ desde;
    return this.http.get( url ).map( (resp : any) => {
        this.totalModelos = resp.total;
        return resp;
     });
  }
  cargarModelosById(id: string) { 
    let url = URL_SERVICIOS + '/search/coleccion/modelosbyid/'+ id;
    return this.http.get( url ).map( (resp : any) => {
        this.totalModelos = resp.total;
        return resp;
     });
  }
  obtenerModelo(id: string){
    let url = URL_SERVICIOS + '/modelo/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.get( url )
              .map( (resp: any) => resp.modelo );
  }

  buscarModelo( termino: string ) {

    let url = URL_SERVICIOS + '/search/coleccion/modelos/' + termino;
    return this.http.get( url )
                .map( (resp: any) => resp.modelos );

  }

  guardarModelo( modelo: Modelo ) {

    let url = URL_SERVICIOS + '/modelo';

    if ( modelo._id ) {
      // actualizando
      url += '/' + modelo._id;
      url += '?token=' + this._usuarioService.token;
     
      
      return this.http.put( url, modelo )
                .map( (resp: any) => {
                  swal('Modelo Actualizado', modelo.nombre, 'success');
                  return resp.modelo;
                });

    }else {
      // creando
      url += '?token=' + this._usuarioService.token;
      
      return this.http.post( url, modelo )
              .map( (resp: any) => {
                swal('Modelo Creado', modelo.nombre, 'success');
                return resp.modelo;
               
              });
    }
  }

  eliminarModelo( id: string){
    let url = URL_SERVICIOS + '/modelo/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete( url )
              .map( resp => {
                swal( 'Modelo Borrado', 'Modelo borrado correctamente', 'success' );
                return resp;
              });
  }

  actualizarModelo( modelo: Modelo ) {

    let url = URL_SERVICIOS + '/modelo/' + modelo._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, modelo )
              .map( (resp: any) => {
                swal('Modelo Actualizado', modelo.nombre, 'success');
                return resp.modelo;
              });

  }

}
