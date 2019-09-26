import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { User } from '../models/user';

import { JwtResponse } from '../models/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable()
export class AuthService {
  private _urlApi = environment.urlApi;
  private _registerUrl = this._urlApi + "api/register"
  private _loginUrl = this._urlApi + "api/login"
  private _confirmar = this._urlApi + "api/confirmation"
  private _userData = this._urlApi + "api/user-data?email="
  private _updateUser = this._urlApi + "api/update-user?id="
  private _getImgUser = this._urlApi + "api/get-img-name/"
  private _registerPublicacion = this._urlApi + "api/register-publicacion?email="
  private _getPublicacion = this._urlApi + "api/get-publicacion/"
  private _getPublicacionId = this._urlApi + "api/get-one-publicacion/"
  private _getPublicacionesDestacadas = this._urlApi + "api/get-publicaciones-destacadas/"
  private _deletePublicacion = this._urlApi + "api/delete-publicacion/"
  private _updatePublicacion = this._urlApi + "api/update-publicacion/"
  private _searchCategoria = this._urlApi + "api/search-categoria/"
  private _preguntaPublicacion = this._urlApi + "api/pregunta/"
  private _respuestaPublicacion = this._urlApi + "api/respuesta/"
  private _pyrPublicacion = this._urlApi + "api/pyr/"
  private _pyrOnePublicacion = this._urlApi + "api/onePyR/"
  private _nuevaNotificacionPregunta = this._urlApi + "api/notificacion-pregunta/"
  private _nuevaNotificacionRespuesta = this._urlApi + "api/notificacion-respuesta/"
  private _notificacionesNuevas = this._urlApi + "api/nuevas-notificaciones/"
  private _notificacionesTodas = this._urlApi + "api/todas-notificaciones/"
  private _notificacionVista = this._urlApi + "api/notificacion-vista/"

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

  delete_publicacion(id) {
    return this.http.delete<any>(this._deletePublicacion + id);
  }

  get_publicacion_id(id) {
    return this.http.get<any>(this._getPublicacionId + id);
  }

  update_publicacion(id, publicacion) {
    let params = JSON.stringify(publicacion);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this._updatePublicacion + id, params, { headers: headers });
  }

  get_publicaciones_destacadas() {
    return this.http.get<any>(this._getPublicacionesDestacadas)
  }



  /* BÚSQUEDA DE CATEGORIAS Y PUBLICACIONES */
  search_categoria(name) {
    return this.http.get<any>(this._searchCategoria + name);
  }


  /* CRUD DE PREGUNTAS Y RESPUESTAS DE PUBLICACIONES */
  get_preguntas_respuestas(id) {
    return this.http.get<any>(this._pyrPublicacion + id)
  }

  get_una_pregunta_respuesta(id) {
    return this.http.get<any>(this._pyrOnePublicacion + id)
  }

  post_pregunta_publicacion(id, name, pregunta) {
    let params = JSON.stringify(pregunta);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this._preguntaPublicacion + id + "/" + name, params, { headers: headers });
  }

  post_respuesta_publicacion(id, name, respuesta) {
    let params = JSON.stringify(respuesta);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this._respuestaPublicacion + id + "/" + name, params, { headers: headers });
  }


  /* NOTIFICACIONES */
  notificacion_pregunta_publicacion(origen, destino, id_publicacion) {
    let params = JSON.stringify(id_publicacion);
    return this.http.post<any>(this._nuevaNotificacionPregunta + origen + "/" + destino + "/" + id_publicacion,params);
  }

  notificacion_respuesta_publicacion(origen, destino, id_publicacion) {
    let params = JSON.stringify(id_publicacion);
    return this.http.post<any>(this._nuevaNotificacionRespuesta + origen + "/" + destino + "/" + id_publicacion,params);
  }

  notificacion_nueva(username){
    return this.http.get<any>(this._notificacionesNuevas + username);
  }

  notificaciones_todas(username){
    return this.http.get<any>(this._notificacionesTodas + username);
  }

  notificacion_vista(notificacion){
    let params = JSON.stringify(notificacion);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(this._notificacionVista, params, { headers: headers });
  }
}
