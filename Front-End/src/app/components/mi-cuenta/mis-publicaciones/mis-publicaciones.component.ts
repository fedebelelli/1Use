import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mis-publicaciones',
  templateUrl: './mis-publicaciones.component.html',
  styleUrls: ['./mis-publicaciones.component.css']
})
export class MisPublicacionesComponent implements OnInit {

  constructor(private _auth: AuthService) { }

  publicaciones = [];
  titulo: string;
  hayPublicaciones: boolean;

  ngOnInit() {
    this._auth.get_publicacion(localStorage.getItem("email")).subscribe(
      err => {
        //console.log(err);
        this.hayPublicaciones = true;
        this.publicaciones = err.publicaciones;
      },
      res => {
        //console.log(res);
        this.titulo = "No hay publicaciones para mostrar"
        this.hayPublicaciones = false;
      }
    )
  }

  deletePublicacion(publicacion){
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
}
