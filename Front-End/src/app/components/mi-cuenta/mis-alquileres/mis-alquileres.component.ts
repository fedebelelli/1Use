import { Component, OnInit } from '@angular/core';
import { SingletonService } from '../../singleton.service';
import { AuthService } from 'src/app/services/auth.service';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-mis-alquileres',
  templateUrl: './mis-alquileres.component.html',
  styleUrls: ['./mis-alquileres.component.css']
})
export class MisAlquileresComponent implements OnInit {

  constructor(private _auth: AuthService, private singleton: SingletonService) { }

  ngOnInit() {
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
