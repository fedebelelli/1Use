import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { SingletonService } from '../../singleton.service';

@Component({
  selector: 'app-detalle-publicacion',
  templateUrl: './detalle-publicacion.component.html',
  styleUrls: ['./detalle-publicacion.component.css']
})
export class DetallePublicacionComponent implements OnInit {

  constructor(private _auth: AuthService, private _singleton: SingletonService) { }

  id;
  titulo;
  preciodia;
  preciosemana;
  preciomes;
  descripcion;
  categoria;
  subcategoria;
  publicacion;
  JSON;
  JSONfinal;
  arrayJSON = [];
  preguntas = [];
  tienePreguntas = false;
  tieneRespuesta = false;
  es_publicador = false;
  email;
  logueado;

  ngOnInit() {
    var urlActual = window.location.href;
    this.id = urlActual.substr(36);

    this._auth.get_publicacion_id(this.id).subscribe(
      err => {

        this.titulo = err.publicaciones.titulo;
        this.preciodia = err.publicaciones.preciodia;
        this.preciomes = err.publicaciones.preciomes;
        this.preciosemana = err.publicaciones.preciosemana;
        this.descripcion = err.publicaciones.descripcion;
        this.categoria = err.publicaciones.categoria;
        this.subcategoria = err.publicaciones.subcategoria;

        //Para mostrar las imagenes
        this.publicacion = err.publicaciones;
        this.JSON = err.publicaciones.multiplefile;
        this.JSONfinal = JSON.parse(this.JSON); //CREA JSON CONVERTIDO DE STRING
        for (let j in this.JSONfinal) {
          this.arrayJSON.push(this.JSONfinal[j]);
        }
        this.publicacion.multiplefile = this.arrayJSON;

        this.email = this.publicacion.email;
        this._auth.user_data(localStorage.getItem("email")).subscribe(
          res => {
            this.logueado = res;
            if (this.email == this.logueado.email) {
              this.es_publicador = true;
            } else {
              this.es_publicador = false;
            }

          },
        )


        //VERIFICAR QUE SALGAN LAS PREGUNTAS SOLO DE ESTA PUBLICACION
        this._auth.get_preguntas_respuestas(this.id).subscribe(
          res => {
            //Me devuelve un objeto que contiene un array de pyr
            this.preguntas = res.publicacion;
            this.preguntas.reverse();
            if (this.preguntas[0].pregunta != null || this.preguntas[0].pregunta != undefined) {
              this.tienePreguntas = true;
            }

          },
        )
      },
      res => {
      })
  }

  enviarPregunta(pregunta) {
    this._auth.user_data(localStorage.getItem("email")).subscribe(
      res => {
        let usuario = res;
        let objeto = { pregunta: pregunta }
        this._auth.post_pregunta_publicacion(this.id, usuario.name, objeto).subscribe(
          res => {
            this.ngOnInit();
          }
        );

      }
    )
  }

  enviarRespuesta(respuesta, pregunta) {

    let _id = pregunta._id;

    this._auth.user_data(localStorage.getItem("email")).subscribe(
      res => {
        let usuario = res;
        let objeto = { respuesta: respuesta }
        this._auth.post_respuesta_publicacion(_id, usuario.name, objeto).subscribe(
          res => {
            this.ngOnInit();
          }
        );

      }
    )


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
  };

}
