import { UsuarioService } from './../usuario/usuario.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginGuardGuard implements CanActivate {
  /**
   *
   */
  constructor(public _userService: UsuarioService , public router: Router) {

  }
  canActivate() {
    if ( this._userService.estaLogeado()) {
      console.log('paso el guard');
      // this.router.navigate(['/dashboard']);
      return true;

    } else {
      console.log('no paso ni el guard');
      this.router.navigate(['/login']);
      return false;
    }

  }
}
