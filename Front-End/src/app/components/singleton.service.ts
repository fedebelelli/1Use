import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class SingletonService {

  constructor() { }

  estado: boolean;
  inicioSesion: boolean;
  mensajeError: string;

  paginaActual(urlActual: string): boolean {

    if (urlActual == "/login") {
      this.estado = false;
    }

    if (urlActual == "/register") {
      this.estado = false;
    }

    if (urlActual == "/perfil") {
      this.estado = false;
    }

    if (urlActual == "/about") {
      this.estado = false;
    }

    if (urlActual == "/home") {
      this.estado = true;
    }

    if (urlActual == "/") {
      this.estado = true;
    }

    if (urlActual == "/categorias") {
      this.estado = false;
    }

    if (urlActual == "/terminos-condiciones") {
      this.estado = false;
    }

    if (urlActual == "/confirmacionemail") {
      this.estado = false;
    }

    if (urlActual == "/confirma") {
      this.estado = false;
    }

    return this.estado;
  }

  setEstado(estado: boolean) {
    this.estado = estado;
  }

  getEstado(): boolean {
    return this.estado;
  }

  setInicioSesion(inicio: boolean) {
    this.inicioSesion = inicio;
  }

  getInicioSesion(): boolean {
    if (localStorage.getItem("email") != null) {
      return true;
    }
    return false;
  }

  setMensajeError(mensaje: string) {
    this.mensajeError = mensaje;
  }

  getMensajeError(): string {
    return this.mensajeError;
  }
}
