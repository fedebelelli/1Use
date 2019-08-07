import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AuthService } from 'src/app/services/auth.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-register-publicacion ',
  templateUrl: './register-publicacion.component.html',
  styleUrls: ['./register-publicacion.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }, UploadService]
})
export class RegisterPublicacionComponent implements OnInit {

  categoriaFormGroup: FormGroup;
  datosProductosGroup: FormGroup;
  fotoProductoGroup: FormGroup;
  image;
  joinGroup;
  categoria: string;
  subcategoria: string;
  titulo: string;
  descripcion: string;
  preciodia: number;
  preciosemana: number;
  preciomes: number;
  _id;

  /* Visualización de imagenes */
  public imagePath;
  imgURL: any;
  public message: string;
  public filesToUpload: Array<File>;
  hayImagen: boolean = false;
  arrayImagenes = [];

  constructor(private _formBuilder: FormBuilder, private _auth: AuthService, private _uploadService: UploadService) { }

  ngOnInit() {
    this.categoriaFormGroup = this._formBuilder.group({
      categoria: [''],
      subcategoria: [{ value: '' }, Validators.required]
    });

    this.datosProductosGroup = this._formBuilder.group({
      titulo: [{ value: '' }, Validators.required],
      descripcion: [{ value: '' }, Validators.required],
      preciodia: [{ value: '' }, Validators.required],
      preciosemana: [{ value: '' }],
      preciomes: [{ value: '' }]
    });

    this.fotoProductoGroup = this._formBuilder.group({
      multiplefile: ['', Validators.required]
    });

    this.joinGroup = {
      ...this.categoriaFormGroup.value,
      ...this.datosProductosGroup.value,
      ...this.fotoProductoGroup.value
    };
  }

  obtenerSubCategoria(evento) {
    this.subcategoria = evento.value;
  }

  obtenerCategoria(evento) {
    this.categoria = evento._element.nativeElement.title;
  }

  onFilesAdded(files: File[]) {
    this.image = files;
    this.arrayImagenes = [];
    this.arrayImagenes.length = 0;
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent) => {
        const content = (e.target as FileReader).result;
        this.arrayImagenes.push(content);
      };
      reader.readAsDataURL(file);
    });
    //console.log(this.arrayImagenes);
  }

  actualizarDatos() {

    if (this.preciomes == undefined || this.preciomes == null) {
      this.preciomes = 0;
    }

    if (this.preciosemana == undefined || this.preciosemana == null) {
      this.preciosemana = 0;
    }

    this.categoriaFormGroup.patchValue({
      categoria: this.categoria,
      subcategoria: this.subcategoria
    })

    this.datosProductosGroup.patchValue({
      titulo: this.titulo,
      descripcion: this.descripcion,
      preciodia: this.preciodia,
      preciosemana: this.preciosemana,
      preciomes: this.preciomes
    })

    this.fotoProductoGroup.patchValue({
      multiplefile: this.image
    })

    this.joinGroup = {
      ...this.categoriaFormGroup.value,
      ...this.datosProductosGroup.value,
      ...this.fotoProductoGroup.value
    };

  }

  onSubmit() {

    let email = localStorage.getItem("email");
    this.categoria = this.joinGroup.categoria;
    this.titulo = this.joinGroup.titulo;

    this._auth.registrarPublicacion(email, this.joinGroup).subscribe(
      response => {
      },
      err => {
        this._uploadService.makeFileRequest("http://localhost:4201/api/upload-publicacion-img/" + email + "/" + this.titulo + "/" + this.categoria, [], this.image, 'multiplefile')
          .then((result: any) => {
            console.log(result);
          });
      }
    )
  }




  /* ---------------- CARGA DE ARRAYS --------------------- */
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
