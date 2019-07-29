import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class SingletonService {

  constructor(private _router: Router) { }

  estado: boolean;

  paginaActual(urlActual:string): boolean {
    
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
    return this.estado;
  }

}
