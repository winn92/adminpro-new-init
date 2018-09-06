import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import swal from 'sweetalert';
import { UsuarioService } from './../services/service.index';
import { Usuario } from './../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(public _usuarioService: UsuarioService, public router: Router) { }

  sonIguales(campo1: string, campo2: string) {
    return (group: FormGroup) => {
      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;
      if (pass1 === pass2) {
        return null;
      }

      return {
        sonIguales: true,
      };
    };
  }

  ngOnInit() {
    init_plugins();
    const { required, email } = Validators;
    this.forma = new FormGroup({
      nombre: new FormControl(null, required),
      correo: new FormControl(null, [required, email]),
      password: new FormControl(null, required),
      password2: new FormControl(null, required),
      condiciones: new FormControl(false),
    }, { validators: this.sonIguales('password', 'password2') });

    this.forma.setValue({
      nombre: 'Test',
      correo: 'test@test.com',
      password: '123456',
      password2: '123456',
      condiciones: true
    });
  }

  registrarUsuario() {
    if (this.forma.invalid) {
      return;
    }

    if (!this.forma.value.condiciones) {
      swal('Importante', 'Debe aceptar las condiciones', 'warning');
      return;
    }

    // console.log(this.forma.value);
    const { nombre, correo, password } = this.forma.value;
    const usuario = new Usuario(nombre, correo, password);
    this._usuarioService.crearUsuario(usuario).subscribe(resp => {
      console.log(JSON.stringify(resp));
      this.router.navigate(['/login']);
    });
  }
}
