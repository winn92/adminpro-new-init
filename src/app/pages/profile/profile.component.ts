import { Component, OnInit } from '@angular/core';
import { Usuario } from './../../models/usuario.model';
import { UsuarioService } from './../../services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  constructor(public _usuarioService: UsuarioService) {
    this.usuario = _usuarioService.usuario;
  }

  ngOnInit() {
  }

  guardar(values: Usuario) {
    this.usuario.nombre = values.nombre;
    if (!this.usuario.google) {
      this.usuario.email = values.email;
    }
    this._usuarioService.actualizarUsuario(this.usuario).subscribe();
  }

}
