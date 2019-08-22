import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { SingletonService } from '../../singleton.service';

@Component({
  selector: 'app-mis-publicaciones',
  templateUrl: './mis-publicaciones.component.html',
  styleUrls: ['./mis-publicaciones.component.css']
})
export class MisPublicacionesComponent implements OnInit {

  constructor(private _auth: AuthService, private singleton:SingletonService) { }

  publicaciones = [];
  titulo: string;
  hayPublicaciones: boolean;
  imagen;
  imagenJSON;
  arrayJSON = [];
  arrayImagen = [];

  ngOnInit() {
    this._auth.get_publicacion(localStorage.getItem("email")).subscribe(
      err => {
        this.hayPublicaciones = true;
        this.publicaciones = err.publicaciones;
        for (let i = 0; i < this.publicaciones.length; i++) {
          this.imagen = this.publicaciones[i].multiplefile;
          this.imagenJSON = JSON.parse(this.imagen); //CREA JSON CONVERTIDO DE STRING
          for (let j in this.imagenJSON) {
            this.arrayJSON.push(this.imagenJSON[j]);
          }
          this.publicaciones[i].multiplefile = this.arrayJSON;
          this.arrayJSON = [];
        }

      },
      res => {
        //console.log(res);
        this.titulo = "No hay publicaciones para mostrar"
        this.hayPublicaciones = false;
      }
    )
  }
  cerrarSesion(){
    this.singleton.cerrarSesion();
  }

  deletePublicacion(publicacion) {
    this._auth.delete_publicacion(publicacion._id).subscribe(
      err => {
        console.log("Por err");
        this.ngOnInit();
      },
      res => {
        console.log("Por res");
        this.ngOnInit();
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
