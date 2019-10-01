import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SingletonService } from '../singleton.service';
import { tokenName } from '@angular/compiler';


@Component({
  selector: 'app-newpwd',
  templateUrl: './newpwd.component.html',
  styleUrls: ['./newpwd.component.css']
})

export class NewpwdComponent implements OnInit {

  
  constructor(private _auth: AuthService, private _router: Router, private route: ActivatedRoute, private singleton: SingletonService) { }
  private token: string;

  

  ngOnInit() {
    // if (!this.singleton.verificarToken()) {
    //   this._router.navigate(['/*']);
    // } else this.token = this.route.snapshot.params['token'];
    this.token = this.route.snapshot.params['token']

  }

  newPwdData = { password: undefined, password2: undefined}
  data =  this.token;
  

  

  newPwd() {
    this._auth.newPwd(this.newPwdData, this.token).subscribe(
      
      res => {
        localStorage.removeItem("token");
        this._router.navigate(['/home']);
        
      },
      err => {
        console.log(err)
        
      }
    )
  }
  
  

}
