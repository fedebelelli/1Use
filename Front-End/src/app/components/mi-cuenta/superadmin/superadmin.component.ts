import { Component, OnInit } from '@angular/core';
import { SingletonService } from '../../singleton.service';

@Component({
  selector: 'app-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.css']
})
export class SuperadminComponent implements OnInit {

  constructor(private singleton: SingletonService) { }

  ngOnInit() {
  }

  cerrarSesion() {
    this.singleton.cerrarSesion();
  }

}
