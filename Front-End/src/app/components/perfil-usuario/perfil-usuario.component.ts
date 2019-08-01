import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';
import provincias from './provincias.json';
import ciudades from './ciudades-argentinas.json';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { SingletonService } from '../singleton.service';

declare var require: any;
var sortJsonArray = require('sort-json-array');

export interface Provincias {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css'],
  providers: [AuthService, { provide: MAT_DATE_LOCALE, useValue: 'es-LA' }]
})

export class PerfilUsuarioComponent implements OnInit {

  public name: string;
  public nombre: string;
  public apellido: string;
  public email: string;
  public telefono: number;
  public fechaNacimiento: Date;
  public provinciaActual: string;
  public direccion: string;
  public imagen: string;
  public ciudad: string;

  //Datos del form
  formulario = new FormGroup({
    name: new FormControl({ value: '', disabled: true }),
    nombre: new FormControl({ value: '', disabled: false }),
    apellido: new FormControl({ value: '', disabled: false }),
    email: new FormControl({ value: '', disabled: true }),
    telefono: new FormControl({ value: '', disabled: false }),
    fecha_nacimiento: new FormControl({ value: '', disabled: false }),
    provincia: new FormControl({ value: '', disabled: false }),
    direccion: new FormControl({ value: '', disabled: false }),
    removablefile: new FormControl({ value: '', disabled: false }),
    ciudad: new FormControl({ value: '', disabled: false })
  });


  //Para traer los datos de la BD en el form
  public user = {};
  emailLogueado = localStorage.getItem("email");

  //Para armar los JSON de provincias y ciudades
  datosCiudades = [];
  datosProvincias: Provincias[];
  ciudadesFiltradas: string[];
  date = new FormControl();
  ciudadControl: FormControl = new FormControl();

  //Para Datepicker
  maxDate;

  //Para mensaje de eror
  @Output() mensajeError = new EventEmitter<string>();
  enviarError(mensaje: string) { this.mensajeError.emit(mensaje) }



  constructor(private _auth: AuthService, private _snackBar: MatSnackBar, private _adapter: DateAdapter<any>, private singleton: SingletonService, private _router: Router) {
  }

  ngOnInit() {

    if (this.verificarInicioSesion() == false) {
      return;
    }

    this._adapter.setLocale('es');
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);

    this._auth.user_data(this.emailLogueado).subscribe(
      res => {

        this.name = res.name;

        if (res.nombre == undefined) {
          this.nombre = "";
        } else this.nombre = res.nombre;

        if (res.apellido == undefined) {
          this.apellido = "";
        } else this.apellido = res.apellido;

        this.email = res.email;

        if (res.telefono == undefined) {
          this.telefono = null;
        } else this.telefono = res.telefono;

        if (res.fecha_nacimiento == undefined) {
          this.fechaNacimiento = undefined;
          this.date = new FormControl({ value: '', disabled: true }, [Validators.required])
        } else {
          let fecha = new Date(res.fecha_nacimiento);
          this.fechaNacimiento = fecha;
          this.date = new FormControl({ value: fecha, disabled: true }, [Validators.required]);

        }

        if (res.ciudad == undefined) {
          this.ciudadControl = new FormControl({ value: '', disabled: true }, [Validators.required]);
        } else {
          let ciudad = res.ciudad;
          this.ciudad = ciudad;
          this.ciudadControl = new FormControl({ value: ciudad, disabled: false }, [Validators.required]);
        }

        if (res.provincia == undefined) {
          this.provinciaActual = undefined;
        } else {
          this.provinciaActual = res.provincia;
          this.filtrarCiudades(this.provinciaActual);
        }


        if (res.direccion == undefined) {
          this.direccion = "";
        } else this.direccion = res.direccion;

        if (res.imagen == undefined) {
          this.imagen = "asd";
        } else this.imagen = res.removablefile;

      },
      error => {
        this.openSnackBar(error.error, "Aceptar")
      }
    )
    this.crearJSONprovincias();
    this.crearJSONciudades();

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 8000,
      panelClass: ['color-snackbar']
    });
  }

  onSelectionChanged({ value }) {
    this.provinciaActual = value;
    this.ciudadControl.enable();
    this.filtrarCiudades(value);
  }

  filtrarCiudades(selectedValue) {
    var filtro = [], index, ciudades = this.datosCiudades;

    for (index in ciudades) {
      if (ciudades[index].value == selectedValue) {
        filtro.push({ 'value': ciudades[index].viewValue, 'viewValue': ciudades[index].viewValue })
      }
    }
    this.ciudadesFiltradas = filtro;
    //console.log(this.ciudadesFiltradas);
  }

  //Para arreglos de provincias
  crearJSONprovincias() {
    let index, JSONprovincias = provincias;
    let arreglo = [];
    for (index in JSONprovincias) {
      arreglo.push({ 'value': JSONprovincias[index].iso_nombre, 'viewValue': JSONprovincias[index].nombre })
    }
    this.datosProvincias = sortJsonArray(arreglo, 'viewValue', 'asc');
  }

  //Para arreglos de Provincias + Ciudades
  crearJSONciudades() {
    let index1, index2, index3, JSONciudades = ciudades;
    let arregloInicial = [];
    let arregloFinal = [];

    for (index1 in JSONciudades) {
      //[(Provincia,Arreglo de ciudades)]
      arregloInicial.push({ 'provincia': JSONciudades[index1].nombre, 'ciudad': JSONciudades[index1].ciudades })
    }
    //console.log(arregloInicial);

    //[(Provincia,Ciudad)]
    for (index2 in arregloInicial) {
      for (index3 in arregloInicial[index2].ciudad) {
        arregloFinal.push({ 'value': arregloInicial[index2].provincia, 'viewValue': arregloInicial[index2].ciudad[index3].nombre })
      }
    }
    this.datosCiudades = arregloFinal;
    //console.log(this.datosCiudades);
  }

  /*   onSubmit() {
      let email = localStorage.getItem("email");
      this._auth.update_user(this.user, email).subscribe(
        res => {
          this.openSnackBar(res, "Aceptar");
        },
        err => {
          this.openSnackBar(err.error.text, "Aceptar");
        }
      )
    } */

  onSubmit() {
    this.updateFormularioControl();
    let email = localStorage.getItem("email");

    console.log(this.formulario);

    this._auth.update_user(this.formulario.value, email).subscribe(
      res => {
        this.openSnackBar(res, "Aceptar");
      },
      err => {
        this.openSnackBar(err.error.text, "Aceptar");
      }
    )
  }

  verificarInicioSesion(): boolean {
    if (this.singleton.getInicioSesion() == false) {
      this._router.navigate(['/*']);
      return false;
    }
    return true;
  }

  updateFormularioControl() {

    this.formulario.patchValue({
      name: this.name,
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      telefono: this.telefono,
      fecha_nacimiento: this.fechaNacimiento,
      provincia: this.provinciaActual,
      direccion: this.direccion,
      ciudad: this.ciudad,
      removablefile: this.imagen
    })

  }

}

