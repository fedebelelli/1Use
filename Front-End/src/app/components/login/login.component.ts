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

  constructor(private authServices: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLogin(form): void {
    this.authServices.login(form.value).subscribe(res => {
      this.router.navigateByUrl('/components');
    });
  }

  //Variables y métodos para los inputs/forms
  value1 = '';
  hide = true;


}
