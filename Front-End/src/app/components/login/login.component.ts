import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

<<<<<<< HEAD
  @Output() inicioSesion = new EventEmitter<void>();
  indicarInicio() { this.inicioSesion.emit() };

  loginUserData = { email: undefined }
  constructor(private _auth: AuthService, private _router: Router, private _snackBar: MatSnackBar, private singleton: SingletonService) { }
=======
  loginUserData = {email: undefined}
  constructor(private _auth: AuthService, private _router: Router, private _snackBar: MatSnackBar) { }
>>>>>>> ccf4b67eb5c975c39af944a658c2cedaa3a96808

  ngOnInit() {
    
  }

  loginUser() {
    this._auth.loginUser(this.loginUserData).subscribe(
      res => {
        localStorage.setItem('token', res.token)
        localStorage.setItem('email', this.loginUserData.email)
        
        this._router.navigate(['/home'])
        this.indicarInicio();
      },
      err => {
        this.openSnackBar(err.error, "Aceptar");
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 8000,
      panelClass: ['color-snackbar']
    });
  }

  // onLogin(form): void {
  //  // this.authServices.login(form.value).subscribe(res => {
  //     this.router.navigateByUrl('/login');
  //   });
  // }

  //Variables y métodos para los inputs/forms
  value1 = '';
  hide = true;





}
