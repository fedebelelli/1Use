import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SingletonService } from '../singleton.service';
import { CategoriasComponent } from '../../components/categorias/categorias.component';
import { SwiperComponent, SwiperConfigInterface} from 'ngx-swiper-wrapper';

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

  constructor(private singleton: SingletonService) { }


  ngOnInit() {

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
    autoplay: { delay: 5000},
  };


}
