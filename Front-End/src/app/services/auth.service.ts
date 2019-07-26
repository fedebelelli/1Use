import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { User } from '../models/user';

import { JwtResponse } from '../models/jwt-response';
import { tap } from 'rxjs/operators';
import {Observable, BehaviorSubject} from 'rxjs';



@Injectable()
export class AuthService {

  private _registerUrl = "http://localhost:4201/api/register"
  private _loginUrl = "http://localhost:4201/api/login"
  private _confirmar = "http://localhost:4201/api/confirmation"
  //authSubject = new BehaviorSubject(false);
  //private token: string;


  constructor(private http: HttpClient) { }


  registerUser(user) {

    return this.http.post<any>(this._registerUrl, user)

  }
 
  loginUser(user) {

    return this.http.post<any>(this._loginUrl, user)

  }

  confirmar(token){
    return this.http.post<any>(this._confirmar, {token: token});
  }


}
