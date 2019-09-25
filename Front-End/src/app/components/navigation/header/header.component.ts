import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { SingletonService } from '../../singleton.service'
import { DropdownDirective, TOGGLE_STATUS } from 'angular-custom-dropdown';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material';
import { PusherService } from '../../../services/pusher.service';

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
  estadoNotDropdown: boolean = false;
  paginaActual: string;
  subscriptionIniciada: boolean = false;
  subscriptionNotIniciada: boolean = false;
  usuarioIniciado = {};
  _id;
  mostrarImagen = false;
  tieneNombre = false;

  /* NOTIFICACIONES */
  cantidad;
  noHayNotificacionesNuevas = false;
  mensaje;
  notificaciones = [];
  notificaciones_nuevas = [];
  titulo_publicacion;
  arrayTitulos = [];
  noHayNotificaciones = false;

  constructor(private singleton: SingletonService, private _auth: AuthService, private _snackBar: MatSnackBar, /* private pusherService: PusherService */) { }

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
  @ViewChild('notDropdown', { static: false }) notDropdown: DropdownDirective;

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

  openNotificacionesNow() {
    this.checkNotStatus();
    if (this.estadoNotDropdown == false) {
      this.estadoNotDropdown = true;
    } else {
      this.estadoNotDropdown = false;
    }
  }

  checkNotStatus() {
    if (this.subscriptionNotIniciada == false) {
      this.subscriptionNotIniciada = true;
      this.notDropdown.statusChange()
        .subscribe((status: TOGGLE_STATUS) => {
          if (status === TOGGLE_STATUS.OPEN) {
          } else if (status === TOGGLE_STATUS.CLOSE) {
            this.estadoNotDropdown = false;
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
          this.get_notificaciones_nuevas(res.name);
          this.get_notificaciones_todas(res.name);
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

  redirigirCategoria(categoria) {
    window.location.assign("/busqueda/c/" + categoria)
  }

  redirigirSubcategoria(categoria, subcategoria) {
    window.location.assign("/busqueda/c/" + categoria + "?s=" + subcategoria)
  }

  verificarUsuario() {
    this._auth.user_data(localStorage.getItem("email")).subscribe(
      res => {
        if (this.checkUsuarioCompleto(res)) {
          window.location.assign("/register-publicacion")
        } else {
          this.openSnackBar("Debes completar todos tus datos personales en la sección 'Mi perfil'", "Aceptar")
        }
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 8000,
      panelClass: ['color-snackbar']
    });
  }

  checkUsuarioCompleto(user): boolean {
    if (user.name == undefined || user.name == '' || user.name == null) {
      return false;
    }
    if (user.email == undefined || user.email == '' || user.email == null) {
      return false;
    }
    if (user.apellido == undefined || user.apellido == '' || user.apellido == null) {
      return false;
    }
    if (user.ciudad == undefined || user.ciudad == '' || user.ciudad == null) {
      return false;
    }
    if (user.nombre == undefined || user.nombre == '' || user.nombre == null) {
      return false;
    }
    if (user.provincia == undefined || user.provincia == '' || user.provincia == null) {
      return false;
    }
    if (user.telefono == undefined || user.telefono == '' || user.telefono == null) {
      return false;
    }
    if (user.removablefile == undefined || user.removablefile == '' || user.removablefile == null) {
      return false;
    }
    if (user.calle == undefined || user.calle == '' || user.calle == null) {
      return false;
    }
    if (user.codigoPostal == undefined || user.codigoPostal == '' || user.codigoPostal == null) {
      return false;
    }
    if (user.departamento == undefined || user.departamento == '' || user.departamento == null) {
      return false;
    }
    if (user.numero == undefined || user.numero == '' || user.numero == null) {
      return false;
    }
    if (user.piso == undefined || user.piso == '' || user.piso == null) {
      return false;
    }
    if (user.codArea == undefined || user.codArea == '' || user.codArea == null) {
      return false;
    }
    if (user.barrio == undefined || user.barrio == '' || user.barrio == null) {
      return false;
    }
    return true;
  }

  /* NOTIFICACIONES test */

  get_notificaciones_nuevas(username) {
    /* this.pusherService.channel.bind('nueva-pregunta', data => { this.cantidad = data.likes }); */
    this._auth.notificacion_nueva(username).subscribe(
      res => {
        if (res.not.length > 0) {
          this.noHayNotificacionesNuevas = false;
          this.cantidad = res.not.length;
          this.notificaciones_nuevas = res.not;
        } else {
          this.noHayNotificacionesNuevas = true;
        }
      }
    )
  }

  get_notificaciones_todas(username) {
    this._auth.notificaciones_todas(username).subscribe(
      res => {
        if (res.not.length > 0) {
          this.notificaciones = res.not;
          for (let i = 0; i < this.notificaciones.length; i++) {
            this._auth.get_publicacion_id(res.not[i].id_publicacion).subscribe(
              res1 => {
                this.titulo_publicacion = res1.publicaciones.titulo;
                this.arrayTitulos.push(this.titulo_publicacion);
              })
          }
        } else {
          this.noHayNotificaciones = true;
          this.mensaje = "No hay notificaciones para mostrar";
        }
      }
    )
  }

  desactivarBadge() {
    this.noHayNotificacionesNuevas = true;
    for (let i = 0; i < this.notificaciones_nuevas.length; i++) {
      this._auth.notificacion_vista(this.notificaciones_nuevas[i]).subscribe(
        res => {

        }
      );
    }
  }

}
