import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SingletonService } from '../../singleton.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  @Output() sidenavToggle = new EventEmitter<void>();
  onToggleSidenav() { this.sidenavToggle.emit(); }

  estado1: boolean;
  urlActual: string;
  urlRecortada: string;
  constructor(private singleton: SingletonService) { }


  ngOnInit() {
    this.urlActual = window.location.href;
    this.urlRecortada = this.urlActual.substr(21);
    this.checkPage(this.urlRecortada);
  }

  checkPage(url) {
    this.estado1 = this.singleton.paginaActual(url);
    this.singleton.setEstado(this.estado1);
  }



}
