import { Component, OnInit } from '@angular/core';
import { SingletonService } from 'src/app/components/singleton.service';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css']
})
export class PublicacionesComponent implements OnInit {

  constructor(private singleton: SingletonService) { }

  ngOnInit() {
  }

}
