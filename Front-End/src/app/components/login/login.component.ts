import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {email: undefined}
  constructor(private _auth: AuthService, private _router: Router, private _snackBar: MatSnackBar) { }
  
  ngOnInit() {
  }

  loginUser(){

    this ._auth.loginUser(this.loginUserData).subscribe(

      res => {
          
        //console.log(this.loginUserData)
        localStorage.setItem('token', res.token)
        localStorage.setItem('email', this.loginUserData.email)
        this._router.navigate(['/home'])
        
      },
      err => {
        //console.log(err);
        this.openSnackBar(err.error,"Aceptar");
      }
    )
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,  {
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
