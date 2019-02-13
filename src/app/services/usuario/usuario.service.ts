import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from './../../models/usuario.model';
import { URL_SERVICIOS } from './../../config';
import 'rxjs/add/operator/map';
import swal from 'sweetalert';

import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient, public router: Router) {
    this.cargarStorage();
  }

  estaLogueado() {
    return (this.token) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      if (this.expiro(this.token)) {
        this.token = undefined;
        this.usuario = undefined;
      }
    }
  }

  expiro(token) {
    const decodeToken = this.decodeJWT(token);
    const current_time = Date.now() / 1000;
    return decodeToken && (current_time > decodeToken);
  }

  decodeJWT(token: string) {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }

  logout() {
    this.usuario = null;
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  loginGoogle(token: string) {
    const url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, { token })
      .map((resp: any) => {
        const { id, token: tkn, usuario: user } = resp;
        this.guardarStorage(id, tkn, user);
        return true;
      });
  }

  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    const url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario)
      .map((resp: any) => {
        const { id, token, usuario: user } = resp;
        this.guardarStorage(id, token, user);
        return true;
      });
  }

  crearUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuarios';
    return this.http.post(url, usuario).map((resp: any) => {
      swal('Usuario creado', usuario.email, 'success');
      return resp.usuario;
    });
  }

  actualizarUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuarios/' + usuario._id + '?token=' + this.token;
    console.log(url);
    return this.http.put(url, usuario)
      .map((resp: any) => {
        const usuarioDB: Usuario = resp.usuario;
        this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
        swal('Usuario actualizado', usuario.nombre, 'success');
        return true;
      });
  }
}
