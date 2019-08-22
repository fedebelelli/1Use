import { Component, OnInit } from '@angular/core';
import { SingletonService } from '../../singleton.service';

@Component({
  selector: 'app-mis-alquileres',
  templateUrl: './mis-alquileres.component.html',
  styleUrls: ['./mis-alquileres.component.css']
})
export class MisAlquileresComponent implements OnInit {

  constructor(private singleton:SingletonService) { }

  ngOnInit() {
  }
  cerrarSesion() {
    this.singleton.cerrarSesion();
  }

}
