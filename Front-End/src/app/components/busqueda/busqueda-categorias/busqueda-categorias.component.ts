import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-busqueda-categorias',
  templateUrl: './busqueda-categorias.component.html',
  styleUrls: ['./busqueda-categorias.component.css']
})
export class BusquedaCategoriasComponent implements OnInit {

  /* PARA ENCONTRAR LA CATEGORIA */
  urlActual: String;
  name;
  publicaciones = [];
  titulo: String;
  subcategorias = [];
  encontrado: boolean;
  imagen;
  imagenJSON;
  arrayJSON = [];

  constructor(private _auth: AuthService) { }

  ngOnInit() {
    this.urlActual = window.location.href;
    this.name = this.urlActual.substring(33);

    this._auth.search_categoria(this.name).subscribe(
      err => {
        this.obtenerSubcategoria(this.name);
        this.publicaciones = err.publicaciones;
        for (let i = 0; i < this.publicaciones.length; i++) {
          this.imagen = this.publicaciones[i].multiplefile;
          this.imagenJSON = JSON.parse(this.imagen); //CREA JSON CONVERTIDO DE STRING
          for (let j in this.imagenJSON) {
            this.arrayJSON.push(this.imagenJSON[j]);
          }
          this.publicaciones[i].multiplefile = this.arrayJSON;
          this.arrayJSON = [];
        }

        if (this.publicaciones.length == 0) {
          this.encontrado = false;
          this.titulo = "No existen publicaciones con la categoría seleccionada";
        } else {
          this.encontrado = true;
          this.titulo = "Se encontraron " + this.publicaciones.length + " publicaciones en la categoria seleccionada"
          console.log(this.publicaciones);
        }
      },
      res => {
      })
  }

  obtenerSubcategoria(nombre) {
    if (nombre == "Tecnologia") {
      this.subcategorias = this.electronicaArray;
    }
    if (nombre == "Hogar") {
      this.subcategorias = this.hogarArray;
    }
    if (nombre == "Deporte") {
      this.subcategorias = this.deportesArray;
    }
    if (nombre == "Musica") {
      this.subcategorias = this.musicaArray;
    }
    if (nombre == "Belleza") {
      this.subcategorias = this.bellezaArray;
    }
    if (nombre == "Bebes") {
      this.subcategorias = this.bebesArray;
    }
    if (nombre == "Mascotas") {
      this.subcategorias = this.animalesArray;
    }
    if (nombre == "Herramientas") {
      this.subcategorias = this.herramientasArray;
    }
    if (nombre == "Otros") {
      this.subcategorias = this.otrosArray;
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
