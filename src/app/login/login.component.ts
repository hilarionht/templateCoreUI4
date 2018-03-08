import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router, ActivatedRoute } from '@angular/router';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  auth2: any;
  constructor(  public _userService: UsuarioService, 
                public router: Router,
                public activatedRoute: ActivatedRoute, ) { }

  ngOnInit() {
    this.googleInit();
  }

  googleInit() {
    gapi.load('auth2', () => {
    this.auth2 = gapi.auth2.init({
      client_id: '377013586154-njrbcn0itlm441q75ijmd6sgfvqnenvi.apps.googleusercontent.com',
      cookiepolicy: 'single_host_origin',
      scope: 'profile email'
    });
    this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element , {}, googleUser => {
     
      let token = googleUser.getAuthResponse().id_token;

      this._userService.loginGoogle( token )
                        .subscribe(() => this.router.navigate(['/dashboard']));
      
    });
  }

  login( forma: NgForm) {
    if(forma.invalid) {
      return;
    }
    
    let usuario = new Usuario(null, forma.value.email, forma.value.password);
    this._userService.login(usuario).subscribe(() => this.router.navigate(['/dashboard']));
   
  }
  register(){
    this.router.navigate(['/register']);
  }
}
