import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from './../../services/service.index';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {

  constructor(public _sidebar: SidebarService, public _usuarioService: UsuarioService) { }

  ngOnInit() {
  }

}
