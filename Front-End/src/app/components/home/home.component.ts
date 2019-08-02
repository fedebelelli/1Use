import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SingletonService } from '../singleton.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  inicioSesion: boolean;
  urlActual: string;
  urlRecortada: string;
  usuarioActivo;

   constructor(private singleton: SingletonService) { }


   ngOnInit() {

  }

}
