import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { User } from '../models/user';

import { JwtResponse } from '../models/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';



@Injectable()
export class AuthService {

  private _registerUrl = "http://localhost:4201/api/register"
  private _loginUrl = "http://localhost:4201/api/login"
  private _confirmar = "http://localhost:4201/api/confirmation"
  private _userData = "http://localhost:4201/api/user-data?email="
  private _updateUser = "http://localhost:4201/api/update-user?id="
  private _getImgUser = "http://localhost:4201/api/get-img-name/"

  //authSubject = new BehaviorSubject(false);
  //private token: string;


  constructor(private http: HttpClient) { }


  registerUser(user) {

    return this.http.post<any>(this._registerUrl, user)

  }

  loginUser(user) {

    return this.http.post<any>(this._loginUrl, user)

  }

  confirmar(token) {
    return this.http.post<any>(this._confirmar, { token: token });
  }

  user_data(email) {
    return this.http.get<any>(this._userData + email)
  }

  update_user(user, _id) {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<any>(this._updateUser + _id, params, {headers: headers});
  }

  get_image(id) {
    return this.http.get<any>(this._getImgUser + id);
  }

}
