import { Usuario } from './../../models/usuario.model';
import { UsuarioService } from './../../services/service.index';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  usuario: Usuario;
  constructor( public _userService: UsuarioService) { }

  ngOnInit() {
    this.usuario = this._userService.usuario;
  }


}
