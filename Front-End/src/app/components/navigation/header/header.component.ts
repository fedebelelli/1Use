import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SingletonService } from '../../singleton.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() sidenavToggle = new EventEmitter<void>();

  estado1: boolean;
  inicioSesion: boolean;
  urlActual: string;
  urlRecortada: string;
  usuarioActivo;
  constructor(private singleton: SingletonService) { }

  ngOnInit() {
    this.urlActual = window.location.href;
    this.urlRecortada = this.urlActual.substr(21);
    this.checkPage(this.urlRecortada);
    this.setearInicioSesion();
  }

  setearInicioSesion() {
    this.usuarioActivo = localStorage.getItem("email");
    if (this.usuarioActivo == null) {
      this.singleton.setInicioSesion(false);
    } else this.singleton.setInicioSesion(true);
    
    this.inicioSesion = this.singleton.getInicioSesion();
  }

  checkPage(url) {
    this.estado1 = this.singleton.paginaActual(url);
    this.singleton.setEstado(this.estado1);
  }


  mostrarPantalla() {
    console.log("holiss");
  }

}
