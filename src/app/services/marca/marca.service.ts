import { Injectable } from '@angular/core';
import { UsuarioService } from 'app/services/usuario/usuario.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Marca } from '../../models/marca.model';
import { URL_SERVICIOS } from '../../config/config';
import swal from 'sweetalert2';

@Injectable()
export class MarcaService {

  totalMarcas: number = 0;
  constructor(
    public http: HttpClient, 
    public router: Router, 
    public _usuarioService:UsuarioService
  ) { }
  crearMarca( nombre: string ) {

    let url = URL_SERVICIOS + '/marca';
    url += '?token=' + this._usuarioService.token;

    return this.http.post( url, { nombre } )
              .map( (resp: any) => resp.producto );

  }

  agregarMarca(marca: Marca, _id: string) {
    let url = URL_SERVICIOS + '/marca';
    return this.http.post(url, marca)
                    .map((res: any) => {
                      swal('Marca Creado', marca.nombre, 'success');
                      return res.marca;
                    });
  }

  cargarMarcas(desde: number=0,limite:number=0) { 
    let url = URL_SERVICIOS + '/marca/?desde='+desde+'&limite='+limite;
    return this.http.get( url ).map( (resp : any) => {
        this.totalMarcas = resp.total;
        return resp;
     });
  }

  obtenerMarca(id: string){
    let url = URL_SERVICIOS + '/marca/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.get( url )
              .map( (resp: any) => resp.marca );
  }

  buscarMarca( termino: string ) {

    let url = URL_SERVICIOS + '/search/coleccion/buscarmarcas/' + termino;
    return this.http.get( url )
                .map( (resp: any) => 
                  
                  resp.buscarmarcas

                 );

  }

  guardarMarca( marca: Marca ) {

    let url = URL_SERVICIOS + '/marca';

    if ( marca._id ) {
      // actualizando
      url += '/' + marca._id;
      url += '?token=' + this._usuarioService.token;
     
      
      return this.http.put( url, marca )
                .map( (resp: any) => {
                  swal('Marca Actualizado', marca.nombre, 'success');
                  return resp.marca;
                });

    }else {
      // creando
      url += '?token=' + this._usuarioService.token;
      
      return this.http.post( url, marca )
              .map( (resp: any) => {
                swal('Marca Creado', marca.nombre, 'success');
                return resp.marca;
               
              });
    }
  }

  eliminarMarca( id: string){
    let url = URL_SERVICIOS + '/marca/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete( url )
              .map( resp => {
                swal( 'Marca Borrado', 'Marca borrado correctamente', 'success' );
                return resp;
              });
  }

  actualizarmarca( marca: Marca ) {

    let url = URL_SERVICIOS + '/marca/' + marca._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, marca )
              .map( (resp: any) => {

                swal('Marca Actualiado', marca.nombre, 'success');
                return resp.marca;
              });

  }
}
