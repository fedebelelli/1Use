import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatTabChangeEvent } from '@angular/material';
import provincias from './provincias.json';
import ciudades from './ciudades-argentinas.json';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { SingletonService } from '../singleton.service';
import { UploadService } from '../../services/upload.service';

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
  providers: [AuthService, { provide: MAT_DATE_LOCALE, useValue: 'es-LA' }, UploadService]
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
  public _id: string;
  public urlImagenPerfil: string;

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
    removableFile: new FormControl({ value: '', disabled: false }),
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

  //Para subir archivos
  public filesToUpload: Array<File>;

  //Para mostrar o no imagen en Tab imagenes
  public tabCambiada: boolean = false;

  constructor(private _auth: AuthService, private _snackBar: MatSnackBar, private _adapter: DateAdapter<any>, private singleton: SingletonService, private _router: Router, private _uploadService: UploadService) 
  { }

  ngOnInit() {

    if (this.verificarInicioSesion() == false) {
      return;
    }

    this._adapter.setLocale('es');
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);

    this._auth.user_data(this.emailLogueado).subscribe(
      res => {
        this._id = res._id;
        this.singleton.setIdLogueado(this._id);
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

/*         if (res.imagen == undefined) {
          this.imagen = res.removablefile;
        } else this.imagen = res.removablefile; */

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

  onSubmit() {
    this.updateFormularioControl();
    console.log(this.formulario);
    this._auth.update_user(this.formulario.value, this._id).subscribe(
      response => {
        console.log(response);
      },
      err => {
        console.log(err);
        this._uploadService.makeFileRequest("http://localhost:4201/api/upload-image/" + this._id, [], this.filesToUpload, 'removablefile')
          .then((result: any) => {
            console.log(result);
          });
      }
    )
   // window.location.reload();
    this.openSnackBar("Todo legal", "Aceptar");
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    this.imagen = this.filesToUpload[0].name;
    //console.log(this.filesToUpload)
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
      removableFile: null
    })

  }

  obtenerIdActual(email): string {
    let valor;
    this._auth.user_data(email).subscribe(
      res => {
        console.log(res._id);
        valor = res._id;
        console.log(valor);
      },
      err => {
        console.log(err);
      }
    )
    return valor;
  }

  cambioTab(event: MatTabChangeEvent){
    this.tabCambiada = true;
  }
}

