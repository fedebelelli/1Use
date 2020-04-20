import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-cancelar-dialog',
  templateUrl: './cancelar-dialog.component.html',
  styleUrls: ['./cancelar-dialog.component.css']
})
export class CancelarDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<CancelarDialogComponent>, private _auth:AuthService, @Inject(MAT_DIALOG_DATA) private data) { }

  alquileres = [];
  titulo: string;
  hayAlquileres: boolean;
  imagen;
  imagenJSON;
  arrayJSON = [];
  arrayImagen = [];

  ngOnInit() {
    this._auth.getAlquilerPropios(localStorage.getItem("email")).subscribe(
      err => {
        this.hayAlquileres= true;
        this.alquileres= err.alquileres;
        for (let i = 0; i < this.alquileres.length; i++) {
          this.imagen = this.alquileres[i].multiplefile;
          this.imagenJSON = JSON.parse(this.imagen); //CREA JSON CONVERTIDO DE STRING
          for (let j in this.imagenJSON) {
            this.arrayJSON.push(this.imagenJSON[j]);
          }
          this.alquileres[i].multiplefile = this.arrayJSON;
          this.arrayJSON = [];
        }

      },
      res => {
        //console.log(res);
        this.titulo = "No hay publicaciones para mostrar"
        this.hayAlquileres = false;
      }
    )
  }

  close() {
    this.dialogRef.close();
  }


  eliminarAlquiler() {
    this._auth.delete_alquiler(this.data.alquiler._id).subscribe(
      err => {
        this.ngOnInit();
      },
      res => {
        this.ngOnInit();
      }
    )
  }

}
