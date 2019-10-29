import { Component, OnInit, OnDestroy } from '@angular/core';
import { SingletonService } from '../../singleton.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DatosPropietarioDialogComponent } from './datos-propietario-dialog/datos-propietario-dialog.component';
import { DatosLocatarioDialogComponent } from './datos-locatario-dialog/datos-locatario-dialog.component';
import { CodigoPropietarioDialogComponent } from './codigo-propietario-dialog/codigo-propietario-dialog.component';
import { CodigoLocatarioDialogComponent } from './codigo-locatario-dialog/codigo-locatario-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mis-alquileres',
  templateUrl: './mis-alquileres.component.html',
  styleUrls: ['./mis-alquileres.component.css']
})
export class MisAlquileresComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  usuarioLogueado = {};
  arrayAlquilerPropietario = [];
  arrayDatosPropietario = [];
  arrayAlquilerPropios = [];
  arrayDatosPropios = [];
  hayAlquileresPropietario = false;
  hayAlquileresPropios = false;
  reclamado = false;
  arrayEstados = [];
  arrayDevolucionLocatario = [];
  arrayDevolucionPropietario = [];

  constructor(private _auth: AuthService, private singleton: SingletonService, public dialog: MatDialog) { }

  ngOnInit() {
    this.arrayAlquilerPropietario = []
    this.arrayAlquilerPropios = []
    this.subscription = this._auth.user_data(localStorage.getItem("email")).subscribe(
      res => {
        this.usuarioLogueado = res;
        var username = res.name
        this._auth.getAlquilerPublicaciones(username).subscribe(
          res1 => {
            this.arrayAlquilerPropietario = res1.alquiler;

            for (let i = 0; i < this.arrayAlquilerPropietario.length; i++) {
              var date = new Date(res1.alquiler[i].createdAt).toLocaleDateString();
              this.arrayAlquilerPropietario[i].createdAt = date;
              this.arrayDatosPropietario.push(this.arrayAlquilerPropietario[i])
            }
            this.hayAlquileresPropietario = true;
          })

        this._auth.getAlquilerPropios(username).subscribe(
          res1 => {
            var fechaActual = new Date();
            this.arrayAlquilerPropios = res1.alquiler;

            for (let i = 0; i < this.arrayAlquilerPropios.length; i++) {
              this._auth.get_publicacion_id(res1.alquiler[i].id_publicacion).subscribe(
                res2 => {
                  let fechaCaducidad = new Date(res1.alquiler[i].fechaCaducidadEntrega);
                  let fechaCaducidadDev = new Date(res1.alquiler[i].fechaCaducidadDevolucion);

                  /* Ayuda a que se muestren los botones de "Reclamar" */
                  if ((res1.alquiler[i].estado == "En proceso de entrega" && res2.publicaciones.tipoAlquiler == "AlquilerConIntervencion") ||
                    (res1.alquiler[i].estado == "En proceso de devolución" && res2.publicaciones.tipoAlquiler == "AlquilerConIntervencion")) {
                    if (fechaActual > fechaCaducidad || fechaActual > fechaCaducidadDev) {
                      this.arrayEstados.push(true);
                    } else {
                      this.arrayEstados.push(false);
                    }
                  } else {
                    this.arrayEstados.push(false);
                  }

                })

              var date = new Date(res1.alquiler[i].createdAt).toLocaleDateString();
              this.arrayAlquilerPropios[i].createdAt = date;
              this.arrayDatosPropios.push(this.arrayAlquilerPropios[i])
            }
            this.hayAlquileresPropios = true;
          })
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  cerrarSesion() {
    this.singleton.cerrarSesion();
  }

  pagar(alquiler) {
    this._auth.registrar_EnProcesoEntrega(alquiler.id_publicacion).subscribe(
      res => {
        this.ngOnInit();
      }
    )
  }


  datosPropietarioDialogRef: MatDialogRef<DatosPropietarioDialogComponent>;
  datosLocatarioDialogRef: MatDialogRef<DatosLocatarioDialogComponent>;
  codigoPropietarioDialogRef: MatDialogRef<CodigoPropietarioDialogComponent>
  codigoLocatarioDialogRef: MatDialogRef<CodigoLocatarioDialogComponent>

  openDialogDatosPropietario(alquiler): void {
    this.datosPropietarioDialogRef = this.dialog.open(DatosPropietarioDialogComponent,
      {
        data: {
          alquiler: alquiler
        }
      });
  }

  openDialogDatosLocatario(alquiler): void {
    this.datosLocatarioDialogRef = this.dialog.open(DatosLocatarioDialogComponent,
      {
        data: {
          alquiler: alquiler
        }
      });
  }

  openDialogCodigoPropietario(alquiler): void {
    this.codigoPropietarioDialogRef = this.dialog.open(CodigoPropietarioDialogComponent,
      {
        data: {
          alquiler: alquiler
        }
      });
  }

  openDialogCodigoLocatario(alquiler): void {
    this.codigoLocatarioDialogRef = this.dialog.open(CodigoLocatarioDialogComponent,
      {
        data: {
          alquiler: alquiler
        }
      });
  }

  openDialogCodigoPropietarioDevolucion(alquiler): void {
    this.codigoPropietarioDialogRef = this.dialog.open(CodigoPropietarioDialogComponent,
      {
        data: {
          alquiler: alquiler
        }
      });
  }

  openDialogCodigoLocatarioDevolucion(alquiler): void {
    this.codigoLocatarioDialogRef = this.dialog.open(CodigoLocatarioDialogComponent,
      {
        data: {
          alquiler: alquiler
        }
      });
  }


}
