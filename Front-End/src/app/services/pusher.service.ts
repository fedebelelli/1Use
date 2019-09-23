declare const Pusher: any;
import { Injectable } from '@angular/core';
import { environment } from './enviroment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class PusherService {
  pusher: any;
  channel: any;

  constructor(private http: HttpClient, private _auth:AuthService) {
    this.pusher = new Pusher(environment.pusher.key, {
      cluster: environment.pusher.cluster,
      encrypted: true
    });
    this.channel = this.pusher.subscribe('events-channel');
  }

  nueva_pregunta(name_origen, name_destino, id){
    this._auth.notificacion_pregunta_publicacion(name_origen, name_destino, id).subscribe(data => {})
  }

}
