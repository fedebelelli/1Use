import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { MatSnackBar } from '@angular/material';



@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  //@ViewChild("nombreUsuario", { static: false }) nombreUsuario: ElementRef;
 // @ViewChild("nombre", { static: false }) nombre: ElementRef;
// @ViewChild("apellido", { static: false }) apellido: ElementRef;
  //@ViewChild("email", { static: false }) email: ElementRef;
  //@ViewChild("telefono", { static: false }) telefono: ElementRef;
  //@ViewChild("fechaNacimiento", { static: false }) fechaNacimiento: ElementRef;

 nombreUsuario: string;
 nombre: string;
 apellido: string;
 email: string;
 telefono: number;
 fechaNacimiento: Date;


  userData = {};
  emailLogueado = localStorage.getItem("email");
  constructor(private _auth: AuthService, private _router: Router, private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    //console.log(this.emailLogueado);
    this._auth.user_data(this.emailLogueado).subscribe(
      res => {
        console.log(res);
        this.nombreUsuario = res.name;
        if(res.nombre == undefined){
          this.nombre= "";
        }
        if(res.apellido == undefined){
          this.apellido= "";
        }
        this.email = res.email;
        if(res.telefono == undefined){
          this.telefono= undefined;
        }
        if(res.fechaNacimiento == undefined){
          this.fechaNacimiento= undefined;
        }
        
      },
      error => {
        this.openSnackBar(error.error, "Aceptar")
      }
    )
  }

    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {
        duration: 8000,
        panelClass: ['color-snackbar']
      });
    }
  
}

