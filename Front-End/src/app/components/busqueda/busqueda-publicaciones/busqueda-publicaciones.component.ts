import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatPaginator, MatSort } from '@angular/material';
import { DataTableBusquedaPalabra } from './data-table-bp-datasource';

@Component({
  selector: 'app-busqueda-publicaciones',
  templateUrl: './busqueda-publicaciones.component.html',
  styleUrls: ['./busqueda-publicaciones.component.css']
})
export class BusquedaPublicacionesComponent implements OnInit {

  constructor(private _auth: AuthService) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  dataSource: DataTableBusquedaPalabra;
  displayedColumns = ['id']; /* ,'name', 'amount' */

  palabra: string;
  publicaciones = []
  hayPublicaciones = true;
  filtroPrecioDia = false;
  filtroCategoria = false;
  filtroSubcategoria = false;
  filtroEstrellas = false;
  arraySubcategorias = [];
  arrayCategorias = [];

  ngOnInit() {
    let url = document.location.href;
    this.palabra = url.slice(33);

    if (this.palabra.includes("?p=")) {
      this.filtroPrecioDia = true;
    }

    if (this.palabra.includes("?e=")) {
      this.filtroEstrellas = true;
    }

    if (this.palabra.includes("?s=")) {
      this.filtroSubcategoria = true;
    }

    if (this.palabra.includes("?c=")) {
      this.filtroCategoria = true;
    }

    let params = new URLSearchParams(url);

    this._auth.search_palabra(this.palabra).subscribe(
      res => {
        if (res != undefined) {
          this.hayPublicaciones = true;
          this.publicaciones = res.publicaciones;

          //Categorías de las publicaciones con respecto a la palabra buscada
          for (let i = 0; i < this.publicaciones.length; i++) {
            if (i == 0) {
              this.arrayCategorias.push(this.publicaciones[i].categoria);
            } else {
              if (!this.arrayCategorias.includes(this.publicaciones[i].categoria)) {
                this.arrayCategorias.push(this.publicaciones[i].categoria)
              }
            }
          }
          this.arrayCategorias.sort();

          //Subcategorías obtenidas de las categorías de las publicaciones
          for (let i = 0; i < this.arrayCategorias.length; i++) {
            this.arraySubcategorias.push(this.obtenerSubcategoria(this.arrayCategorias[i]));
          }
          this.arraySubcategorias.sort();


          this.dataSource = new DataTableBusquedaPalabra(this.paginator, this.sort, this.publicaciones);
        } else {
          this.hayPublicaciones = false;
        }
      }
    )
  }

  categoriaSeleccionada(cat) {
    window.location.assign("/")
  }

  obtenerSubcategoria(nombre) {
    if (nombre == "Tecnologia") {
      return this.electronicaArray;
    }
    if (nombre == "Hogar") {
      return this.hogarArray;
    }
    if (nombre == "Deporte") {
      return this.deportesArray;
    }
    if (nombre == "Musica") {
      return this.musicaArray;
    }
    if (nombre == "Belleza") {
      return this.bellezaArray;
    }
    if (nombre == "Bebes") {
      return this.bebesArray;
    }
    if (nombre == "Mascotas") {
      return this.animalesArray;
    }
    if (nombre == "Herramientas") {
      return this.herramientasArray;
    }
    if (nombre == "Otros") {
      return this.otrosArray;
    }
  }

  electronicaArray: string[] = ['TV - Audio - Video', 'Celulares - Tablets', 'Computadoras', 'Notebooks', 'Videojuegos', 'Consolas', 'Cámaras y accesorios']
  hogarArray: string[] = ['Accesorios (Hogar)', 'Decoración', 'Electrodomésticos', 'Muebles', 'Jardin']
  deportesArray: string[] = ['Aerobics y fitness', 'Bicicletas y ciclismo', 'Camping y pesca', 'Deportes acuaticos', 'Futbol', 'Otros deportes']
  musicaArray: string[] = ['Arte y antiguedades', 'CDs - DVDs', 'Instrumentos musicales', 'Libros y revistas']
  bellezaArray: string[] = ['Relojes - joyas - accesorios', 'Ropa y calzado', 'Salud y belleza']
  bebesArray: string[] = ['Cunas - Accesorios', 'Juegos - juguetes', 'Ropa bebés y niños']
  animalesArray: string[] = ['Accesorios para perros', 'Accesorios para gatos', 'Otros (mascotas)']
  herramientasArray: string[] = ['Industria', 'Herramientas', 'Muebles para negocios - oficinas']
  otrosArray: string[] = ['Otra categoria']

}
