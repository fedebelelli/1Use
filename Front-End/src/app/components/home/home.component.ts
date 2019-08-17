import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SingletonService } from '../singleton.service';
import { CategoriasComponent } from '../../components/categorias/categorias.component';
import { SwiperComponent, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { AuthService } from 'src/app/services/auth.service';

@NgModule({
  imports: [CategoriasComponent]
})

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild(SwiperComponent, { static: false }) componentRef?: SwiperComponent;

  inicioSesion: boolean;
  urlActual: string;
  urlRecortada: string;
  usuarioActivo;
  usuario;

  constructor(private singleton: SingletonService, private _auth: AuthService) { }


  ngOnInit() {

  }

  checkPagina() {
    if (this.singleton.getInicioSesion()) {
      this._auth.user_data(localStorage.getItem("email")).subscribe(
        res => {
          this.usuario = res;
          if (this.checkUsuarioCompleto(this.usuario)) {
            this.singleton.paginaActual("/register-publicacion");
            window.location.assign("/register-publicacion");
          } else {
            window.location.assign("/perfil");
          }
        },
        err => {
          console.log(err);
        }
      )
    } else {
      window.location.assign("/login");
    }
  }

  checkUsuarioCompleto(user): boolean {
    if (user.name == undefined) {
      return false;
    }
    if (user.email == undefined) {
      return false;
    }
    if (user.apellido == undefined) {
      return false;
    }
    if (user.ciudad == undefined) {
      return false;
    }
    if (user.direccion == undefined) {
      return false;
    }
    if (user.nombre == undefined) {
      return false;
    }
    if (user.provincia == undefined) {
      return false;
    }
    if (user.telefono == undefined) {
      return false;
    }
    if (user.removablefile == undefined) {
      return false;
    }
    if (user.calle == undefined) {
      return false;
    }
    if (user.codigoPostal == undefined) {
      return false;
    }
    if (user.departamento == undefined) {
      return false;
    }
    if (user.numero == undefined) {
      return false;
    }
    if (user.piso == undefined) {
      return false;
    }
    return true;
  }


  //SWIPER
  public config: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: false,
    scrollbar: false,
    navigation: true,
    pagination: false,
    autoplay: { delay: 5000 },
  };


}
