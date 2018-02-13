import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor( public _userService: UsuarioService) { }

  ngOnInit() {
  }
  login( forma:NgForm){
    if(forma.invalid){
      console.log(forma);
      
      return;
    }
    let usuario= new Usuario(null,forma.value.email, forma.value.passord);
    this._userService.login(usuario).subscribe(resp => {
      console.log(resp);

      
    });
    // console.log(forma.valid);
    // console.log(forma.value);
  }
}
