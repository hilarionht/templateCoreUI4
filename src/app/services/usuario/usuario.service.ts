import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http'
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';//(immportar solo lo que se use)

@Injectable()
export class UsuarioService {

  constructor( public http: HttpClient ) {
     console.log('servio de usuario listo');
   }
  crearUsuario( usuario: Usuario ){
  
    let url = URL_SERVICIOS + '/usuario';
    
    return this.http.post(url, usuario)
      .map((res: any) => {
        swal('Usuario Creado', usuario.email, 'success');
        return res.usuario;
      });
  }
  login(usuario:Usuario){
    let url = URL_SERVICIOS + '/login';
    return this.http.post(url,usuario)
              .map( (resp: any)=> {
                localStorage.setItem('id', resp.id);
                localStorage.setItem('token', resp.token);
                localStorage.setItem('usuario', JSON.stringify(resp.usuario));
                return true;
              });
  }
}
