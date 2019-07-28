import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router} from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() sidenavToggle = new EventEmitter<void>();

  onToggleSidenav() { this.sidenavToggle.emit(); }

  constructor(private _router: Router) { }

  estado: boolean = true;

  ngOnInit() {
    this.paginaActual();
  }

  paginaActual(){
    let urlActual: string = this._router.url;

    if(urlActual.includes("/login")){
      this.estado = false;
    }

    if(urlActual.includes("/register")){
      this.estado = false;
    }

    if(urlActual.includes("/perfil")){
      this.estado = false;
    }

    if(urlActual.includes("/about")){
      this.estado = false;
    }

  }

}
