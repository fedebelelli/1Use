import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit {

  publicaciones: boolean = false;
  alquileres: boolean = false;
  perfil: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}