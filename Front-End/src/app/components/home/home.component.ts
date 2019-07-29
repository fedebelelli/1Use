import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SingletonService } from '../singleton.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  inicioSesion: boolean;
  urlActual: string;
  urlRecortada: string;
  usuarioActivo;

   constructor(private singleton: SingletonService) { }


   ngOnInit() {

  }

/*   setearInicioSesion() {
    this.usuarioActivo = localStorage.getItem("email");
    if (this.usuarioActivo == null) {
      this.singleton.setInicioSesion(false);
    } else this.singleton.setInicioSesion(true);
  } */
}
