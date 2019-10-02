import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { DataTableDataSource } from './data-table-datasource';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/internal/operators/map';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: DataTableDataSource;
  displayedColumns = ['id']; /* ,'name', 'amount' */
  usuarioLogueado;
  notificaciones;
  publicacion;
  JSON;
  JSONfinal;
  arrayJSON = [];
  arrayTitulos = [];
  arrayFechas = [];
  date;
  year;
  month;
  dt;

  constructor(private _auth: AuthService) { }

  ngOnInit() {
    this._auth.user_data(localStorage.getItem("email")).subscribe(
      res1 => {
        this._auth.notificaciones_todas(res1.name).subscribe(
          res2 => {
            for (let i = 0; i < res2.not.length; i++) {
              /* PARA OBTENER FECHAS EN FORMATO AR*/
              this.date = new Date(res2.not[i].createdAt);
              this.year = this.date.getFullYear();
              this.month = this.date.getMonth() + 1;
              this.dt = this.date.getDate();
              this.arrayFechas.push(this.dt + '-' + this.month + '-' + this.year);
              this.arrayJSON.push(res2.not[i].imagen);
              this.arrayTitulos.push(res2.not[i].titulo);
            }
            this.dataSource = new DataTableDataSource(this.paginator, this.sort, res2.not, this.arrayJSON, this.arrayTitulos, this.arrayFechas);
          }
        )
      }
    )
  }
}
