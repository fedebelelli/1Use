import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { MatSnackBar } from '@angular/material';
import provincias from './provincias.json';
import ciudades from './ciudades-argentinas.json';
import { FormControl, NgControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
declare var require: any;
var sortJsonArray = require('sort-json-array');

export interface Provincias {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})

export class PerfilUsuarioComponent implements OnInit {

  nombreUsuario: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: number;
  fechaNacimiento: Date;
  provincia: string;
  localidad: string;
  direccion: string;

  //Para traer los datos de la BD en el form
  userData = {};
  emailLogueado = localStorage.getItem("email");

  //Para armar los JSON de provincias y ciudades
  datosCiudades = [];
  datosProvincias: Provincias[];
  ciudadesFiltradas: string[];

  //Para Autocomplete
  myControl = new FormControl();
  options: string[] = this.ciudadesFiltradas; 
  /* ['One', 'Two', 'Three']; 
    this.ciudadesFiltradas; 
  */
  filteredOptions: Observable<string[]>;

  constructor(private _auth: AuthService, private _router: Router, private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    console.log(['One', 'Two', 'Three']);

    this._auth.user_data(this.emailLogueado).subscribe(
      res => {
        console.log(res);

        this.nombreUsuario = res.name;

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

        if (res.fechaNacimiento == undefined) {
          this.fechaNacimiento = undefined;
        } else this.fechaNacimiento = res.fechaNacimiento;

        if (res.localidad == undefined) {
          this.localidad = undefined;
        } else this.localidad = res.localidad;

        if (res.provincia == undefined) {
          this.provincia = undefined;
        } else this.provincia = res.provincia;

        if (res.direccion == undefined) {
          this.direccion = "";
        } else this.direccion = res.direccion;

      },
      error => {
        this.openSnackBar(error.error, "Aceptar")
      }
    )

    this.crearJSONprovincias();
    this.crearJSONciudades();

    //Para Autocomplete
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 8000,
      panelClass: ['color-snackbar']
    });
  }

  //Para Autocomplete
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  deshabilitarCiudad = new FormGroup({
    seleccionProvincia: new FormControl("", Validators.required),
    testInput: new FormControl({ value: "", disabled: true }, [
      Validators.required
    ])
  });

  onSelectionChanged({ value }) {
    console.log(value);
    this.filtrarCiudades(value);
    this.deshabilitarCiudad.get('testInput').enable();

  }

  filtrarCiudades(selectedValue){
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

  /*
  filtrarCiudades(selectedValue) {
    var filtro: string[] = [], index, ciudades = this.datosCiudades;

    for (index in ciudades) {
      if (ciudades[index].value == selectedValue) {
        filtro.push(ciudades[index].viewValue)
      }
    }
    this.ciudadesFiltradas = filtro;
    console.log(this.ciudadesFiltradas);
  }
  */

}

