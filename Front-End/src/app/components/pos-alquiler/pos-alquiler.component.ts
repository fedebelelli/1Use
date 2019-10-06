import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pos-alquiler',
  templateUrl: './pos-alquiler.component.html',
  styleUrls: ['./pos-alquiler.component.css']
})
export class PosAlquilerComponent implements OnInit {

  constructor(private _auth: AuthService) { }
  titulo;
  preciodia;
  preciomes;
  preciosemana;
  descripcion;
  publicacion;
  JSON;
  JSONfinal;
  arrayJSON = [];
  nombre;
  email;
  telefono;
  urlApi= environment.urlApi;

  ngOnInit() {

    var urlActual = window.location.href;
    var id = urlActual.substr(35);

    this._auth.get_publicacion_id(id).subscribe(
      err => {

        this.titulo = err.publicaciones.titulo;
        this.preciodia = err.publicaciones.preciodia;
        this.preciomes = err.publicaciones.preciomes;
        this.preciosemana = err.publicaciones.preciosemana;
        this.descripcion = err.publicaciones.descripcion;

        //Para mostrar las imagenes
        this.publicacion = err.publicaciones;
        this.JSON = err.publicaciones.multiplefile;
        this.JSONfinal = JSON.parse(this.JSON); //CREA JSON CONVERTIDO DE STRING
        for (let j in this.JSONfinal) {
          this.arrayJSON.push(this.JSONfinal[j]);
        }
        this.publicacion.multiplefile = this.arrayJSON;

        this._auth.user_data(this.publicacion.email).subscribe(
          res => {
            this.nombre = res.nombre;
            this.email = res.email;
            this.telefono = res.telefono;
          },
          err => { }


        )


      },
      res => {
      })
  }


  public config: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 1,
    keyboard: true,
    mousewheel: false,
    scrollbar: false,
    navigation: true,
  };


}

