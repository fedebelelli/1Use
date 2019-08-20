import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

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

  ngOnInit() {
    var urlActual = window.location.href;
    var id = urlActual.substr(36);
    
    this._auth.get_publicacion_id(id).subscribe(
      err => {
        console.log(err.publicaciones);
        this.titulo = err.publicaciones.titulo;
        this.preciodia = err.publicaciones.preciodia;
        this.preciomes = err.publicaciones.preciomes;
        this.preciosemana = err.publicaciones.preciosemana;
        this.descripcion = err.publicaciones.descripcion;
        this.categoria = err.publicaciones.categoria;
        this.subcategoria = err.publicaciones.subcategoria;
      },
      res => {
      })
  }

}
