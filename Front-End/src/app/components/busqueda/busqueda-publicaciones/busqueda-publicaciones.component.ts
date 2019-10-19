import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatPaginator, MatSort } from '@angular/material';
import { DataTableBusquedaPalabra } from './data-table-bp-datasource';
import { StarRatingColor } from './star-rating.component';
import { zip } from 'rxjs';

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

  url = new URL(window.location.href);
  params = new URLSearchParams(this.url.search.slice(1));

  ngOnInit() {
    this.clearURL();
    let urlActual = document.location.href;
    this.palabra = urlActual.slice(33);

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
            let objeto = {'categoria': this.arrayCategorias[i], 'valor': this.obtenerSubcategoria(this.arrayCategorias[i])}
            this.arraySubcategorias.push(objeto);
          }
          this.arraySubcategorias.sort(); 
        
          this.dataSource = new DataTableBusquedaPalabra(this.paginator, this.sort, this.publicaciones);

        } else {
          this.hayPublicaciones = false;
        }
      }
    )
  }

  formatoSlider(value) {
    if (value >= 1000) {
      return '$' + Math.round(value / 1000) + 'k';
    }
    return '$' + value;
  }

  /* Métodos para filtrar por estrellas */
  rating: number = 3;
  starCount: number = 5;
  starColor: StarRatingColor = StarRatingColor.accent;
  starColorP: StarRatingColor = StarRatingColor.primary;
  starColorW: StarRatingColor = StarRatingColor.warn;

  onRatingChanged(rating) {
    this.rating = rating;
    this.filtroSeleccionado('star', rating);
  }


  /* Método para armar la URL dependiendo de qué filtro se seleccione */
  filtroSeleccionado(nombreParametro, valorParametro) {
    this.params.append(nombreParametro, valorParametro);
    window.history.replaceState({}, '', location.pathname + '?' + this.params);
    if (nombreParametro == 'c') {
      this.filtroCategoria = true;
      this.arraySubcategorias = this.obtenerArraySubcategoria(valorParametro);
    }
    if (nombreParametro == 'sc') {
      this.filtroSubcategoria = true;
    }
    if (nombreParametro == 'precio') {
      this.filtroPrecioDia = true;
    }
    if (nombreParametro == 'star') {
      this.filtroEstrellas = true;
    }
  }

  obtenerArraySubcategoria(valor){
    for(let i = 0; i < this.arraySubcategorias.length; i++){
      if(this.arraySubcategorias[i].categoria == valor){
        return this.arraySubcategorias[i].valor
      }
    }
  }

  eliminarFiltro(nombreParametro) {
    this.params.delete(nombreParametro);
    window.history.replaceState({}, '', location.pathname + '?' + this.params);
    if (nombreParametro == 'c') {
      this.filtroCategoria = false;
    }
    if (nombreParametro == 'sc') {
      this.filtroSubcategoria = false;
    }
    if (nombreParametro == 'precio') {
      this.filtroPrecioDia = false;
    }
    if (nombreParametro == 'star') {
      this.filtroEstrellas = false;
    }
  }

  clearURL() {
    window.history.replaceState({}, '', location.pathname);
    this.params.delete('star');
    this.params.delete('precio');
    this.params.delete('c');
    this.params.delete('sc');
    this.filtroCategoria = false;
    this.filtroSubcategoria = false;
    this.filtroPrecioDia = false;
    this.filtroEstrellas = false;
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
