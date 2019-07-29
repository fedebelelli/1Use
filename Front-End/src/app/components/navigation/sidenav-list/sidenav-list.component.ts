import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { SingletonService } from '../../singleton.service'

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent implements OnInit {

  @Output() closeSidenav = new EventEmitter<void>();
  onClose() { this.closeSidenav.emit(); }

  @Output() cambiarEstado = new EventEmitter<string>();
  onClick(url) { this.cambiarEstado.emit(url) }


  buscador(url) {
    this.onClick(url);
  }

  constructor() { }

  ngOnInit() {

  }

}
