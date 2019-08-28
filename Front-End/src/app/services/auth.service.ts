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
  private _registerPublicacion = "http://localhost:4201/api/register-publicacion?email="
  private _getPublicacion = "http://localhost:4201/api/get-publicacion/"
  private _getPublicacionId = "http://localhost:4201/api/get-one-publicacion/"
  private _deletePublicacion = "http://localhost:4201/api/delete-publicacion/"
  private _updatePublicacion = "http://localhost:4201/api/update-publicacion/"
  private _searchCategoria = "http://localhost:4201/api/search-categoria/"

  //authSubject = new BehaviorSubject(false);
  //private token: string;


  constructor(private http: HttpClient) { }

  /* CRUD DE USUARIOS */

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

    return this.http.post<any>(this._updateUser + _id, params, { headers: headers });
  }

  get_image(id) {
    return this.http.get<any>(this._getImgUser + id);
  }


  /* CRUD DE PUBLICACIONES */

  registrarPublicacion(email, publicacion) {
    return this.http.post<any>(this._registerPublicacion + email, publicacion);
  }

  get_publicacion(email) {
    return this.http.get<any>(this._getPublicacion + email);
  }

  delete_publicacion(id){
    return this.http.delete<any>(this._deletePublicacion + id);
  }

  get_publicacion_id(id) {
    return this.http.get<any>(this._getPublicacionId + id);
  }

  update_publicacion(id, publicacion){
    let params = JSON.stringify(publicacion);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this._updatePublicacion + id, params, { headers: headers });
  }



  /* BÚSQUEDA DE CATEGORIAS Y PUBLICACIONES */
  search_categoria(name){
    return this.http.get<any>(this._searchCategoria + name);
  }
}
