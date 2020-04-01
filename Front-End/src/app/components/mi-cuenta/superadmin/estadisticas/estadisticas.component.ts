import { Component, OnInit } from '@angular/core';
import { SingletonService } from 'src/app/components/singleton.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  constructor(private singleton: SingletonService) { }

  ngOnInit() {
  }

}
