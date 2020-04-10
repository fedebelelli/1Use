import { Component, OnInit } from '@angular/core';
import { SingletonService } from 'src/app/components/singleton.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  constructor(private singleton: SingletonService) { }

  estadisticas: string[] = [
    'Cantidad de visitantes al sitio en un periodo de tiempo', 'Cantidad de alquileres según categoría', 'Cantidad de publicaciones según categoría',
    'Cantidad de publicaciones dadas de baja por infringir los términos y condiciones', 'Usuarios que más alquilan objetos', 'Usuarios que más publican en un periodo de tiempo',
    'Usuarios mejores puntuados del sitio por tipo (publicador/locatario)', 'Objetos más alquilados por propietario', 'Cantidad de ingresos monetarios al sitio por mes'
  ];

  

  ngOnInit() {
  }

}
