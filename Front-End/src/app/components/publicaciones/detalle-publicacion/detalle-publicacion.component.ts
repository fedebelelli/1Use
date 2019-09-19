import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-detalle-publicacion',
  templateUrl: './detalle-publicacion.component.html',
  styleUrls: ['./detalle-publicacion.component.css']
})
export class DetallePublicacionComponent implements OnInit {

  constructor(private _auth: AuthService) { }

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
  preguntas = [1,2,3];
  email;

  ngOnInit() {
    var urlActual = window.location.href;
    var id = urlActual.substr(36);

    this._auth.get_publicacion_id(id).subscribe(
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

        this.email = err.publicaciones.email;

      },
      res => {
      })
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
