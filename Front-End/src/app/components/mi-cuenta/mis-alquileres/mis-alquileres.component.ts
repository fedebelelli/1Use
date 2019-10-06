import { Component, OnInit } from '@angular/core';
import { SingletonService } from '../../singleton.service';
import { AuthService } from 'src/app/services/auth.service';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ConfirmacionAlquilerComponent } from '../../confirmacion-alquiler/confirmacion-alquiler.component';

@Component({
  selector: 'app-mis-alquileres',
  templateUrl: './mis-alquileres.component.html',
  styleUrls: ['./mis-alquileres.component.css']
})
export class MisAlquileresComponent implements OnInit {

  usuarioLogueado = {};
  arrayAlquiler = [];
  arrayDatos = [];
  fuePagado;

  constructor(private _auth: AuthService, private singleton: SingletonService) { }

  ngOnInit() {
    this._auth.user_data(localStorage.getItem("email")).subscribe(
      res => {
        this.usuarioLogueado = res;
        var username = res.name

        this._auth.getAlquiler(username).subscribe(
          res1 => {
            this.arrayAlquiler = res1.alquiler;
            var id_publicacion = res1.id_publicacion;
            

            for (let i = 0; i < this.arrayAlquiler.length; i++) {
              var date = new Date(res1.alquiler[i].createdAt).toLocaleDateString();
              this.arrayAlquiler[i].createdAt = date;
              if(this.arrayAlquiler[i].estado == "En proceso de pago"){
                this.fuePagado=false;
              }
              if(this.arrayAlquiler[i].estado == "En proceso de entrega"){
                this.fuePagado=true;
              }
              this.arrayDatos.push(this.arrayAlquiler[i])
            }
          })
      })
  }


  cambioTab(evento) {
    this.ngOnInit();
  }

  cerrarSesion() {
    this.singleton.cerrarSesion();
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
