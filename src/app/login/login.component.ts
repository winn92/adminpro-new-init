import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from './../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  auth2: any;

  constructor(public router: Router, public _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 0) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '247454005695-epjqk84k2qpffsdvhub0d8gkqh3k1e70.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email',
      });
      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, googleUser => {
      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      this._usuarioService.loginGoogle(token).subscribe(correcto => window.location.href = '#/dashboard');
    });
  }

  ingresar(forma: NgForm) {
    const { email, password } = forma.value;
    if (forma.invalid) { return; }

    const usuario = new Usuario(null, email, password);
    this._usuarioService.login(usuario, this.recuerdame)
      .subscribe(correcto => this.router.navigate(['/dashboard']));
    // console.log(forma.valid);
    // console.log(forma.value);
    // console.log('Ingresando');
    // this.router.navigate(['/dashboard']);
  }

}
