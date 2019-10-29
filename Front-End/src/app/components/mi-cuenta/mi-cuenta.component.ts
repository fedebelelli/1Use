import { Component, OnInit } from '@angular/core';
import { SingletonService } from '../singleton.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.component.html',
  styleUrls: ['./mi-cuenta.component.css']
})
export class MiCuentaComponent implements OnInit {

  publicaciones: boolean = false;
  alquileres: boolean = false;
  perfil: boolean = false;

  constructor(private singleton: SingletonService, private _auth: AuthService) { }

  ngOnInit(){
    this._auth.get_visitas_id('5d68670f3c1ee86964c5e05c').subscribe(
      res => {
        let array = res.doc;
        console.log(array)
      }
    )}

  cerrarSesion() {
    this.singleton.cerrarSesion();
  }

  cambioTab(evento) {
    this.ngOnInit();
  }
}
