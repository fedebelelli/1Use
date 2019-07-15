import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {}
  constructor(private _auth: AuthService, private _router: Router ) { }

  ngOnInit() {
  }


  loginUser(){

    this ._auth.loginUser(this.loginUserData).subscribe(

      res => {
          
        console.log(res)
        localStorage.setItem('token', res.token)
        this._router.navigate(['/home'])
      },
      err => console.log(err)

    )

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
