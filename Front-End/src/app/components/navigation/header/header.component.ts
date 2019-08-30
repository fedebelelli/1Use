import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { SingletonService } from '../../singleton.service'
import { DropdownDirective, TOGGLE_STATUS } from 'angular-custom-dropdown';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  @Output() sidenavToggle = new EventEmitter<void>();
  onToggleSidenav() { this.sidenavToggle.emit(); }


  estadoBuscador: boolean;
  inicioSesion: boolean;
  urlActual: string;
  urlRecortada: string;
  usuarioActivo;
  estadoDropdown: boolean = false;
  paginaActual: string;
  subscriptionIniciada: boolean = false;
  usuarioIniciado = {};
  _id;
  mostrarImagen = false;
  tieneNombre = false;

  constructor(private singleton: SingletonService, private _auth: AuthService) { }

  ngOnInit() {
    this.urlActual = window.location.href;
    this.urlRecortada = this.urlActual.substr(21);
    this.paginaActual = this.urlRecortada;
    this.checkPage(this.paginaActual);
    this.setearInicioSesion();
    this.obtenerNombreLogueado();
  }

  setearInicioSesion() {
    this.usuarioActivo = localStorage.getItem("email");
    if (this.usuarioActivo == null) {
      this.singleton.setInicioSesion(false);
    } else this.singleton.setInicioSesion(true);

    this.inicioSesion = this.singleton.getInicioSesion();
  }

  checkPage(url) {
    this.estadoBuscador = this.singleton.paginaActual(url);
    this.singleton.setEstado(this.estadoBuscador);
  }

  @ViewChild('myDropdown', { static: false }) myDropdown: DropdownDirective;

  openNow() {
    this.checkStatus();
    if (this.estadoDropdown == false) {
      this.estadoDropdown = true;
    } else {
      this.estadoDropdown = false;
    }
  }

  checkStatus() {
    if (this.subscriptionIniciada == false) {
      this.subscriptionIniciada = true;
      this.myDropdown.statusChange()
        .subscribe((status: TOGGLE_STATUS) => {
          if (status === TOGGLE_STATUS.OPEN) {
          } else if (status === TOGGLE_STATUS.CLOSE) {
            this.estadoDropdown = false;
          }
        });
    }
  }

  cerrarSesion() {
    this.singleton.cerrarSesion();
  }

  obtenerNombreLogueado() {
    let email = localStorage.getItem("email");
    if (email != undefined || email != null) {
      this._auth.user_data(email).subscribe(
        res => {
          this.usuarioIniciado = res;
          if (res.nombre != undefined) {
            this.tieneNombre = true;
          }
          if (res.removablefile != undefined) {
            this.mostrarImagen = true;
          }
          this.singleton.setIdLogueado(res._id);
          this._id = this.singleton.getIdLogueado();
        },
        err => {
          //console.log(err);
        }
      ) 
    }

  }

  redirigirCategoria(categoria){
    window.location.assign("/busqueda/c/"+categoria)
  }

  redirigirSubcategoria(categoria, subcategoria){
    window.location.assign("/busqueda/c/"+categoria+"?s="+subcategoria)
  }


}
