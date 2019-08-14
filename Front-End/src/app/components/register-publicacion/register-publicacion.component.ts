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
  destacionProductoGroup: FormGroup;
  tipoAlquilerGroup: FormGroup;
  image;
  joinGroup;
  categoria: string;
  subcategoria: string;
  titulo: string;
  descripcion: string;
  preciodia: number;
  preciosemana: number;
  preciomes: number;
  destacar: String;
  seDestaca: Boolean = false;
  tipoAlquiler: String;


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
      subcategoria: ['', Validators.required]
    });

    this.datosProductosGroup = this._formBuilder.group({
      titulo: [{ value: '' }, Validators.required],
      descripcion: [{ value: '' }, Validators.required],
      preciodia: [{ value: '' }, Validators.required],
      preciosemana: [{ value: '' }],
      preciomes: [{ value: '' }]
    });

    this.fotoProductoGroup = this._formBuilder.group({
      multiplefile: [{ value: '' }, Validators.required]
    });
    this.destacionProductoGroup = this._formBuilder.group({
      destacar: [{ value: '' }]

    });
    this.tipoAlquilerGroup = this._formBuilder.group({
      tipoAlquiler: [{ value: '' }, Validators.required]
    });

    this.joinGroup = {
      ...this.categoriaFormGroup.value,
      ...this.datosProductosGroup.value,
      ...this.fotoProductoGroup.value,
      ...this.destacionProductoGroup.value,
      ...this.tipoAlquilerGroup.value
    };
  }

  obtenerSubCategoria(evento) {
    this.subcategoria = evento.value;
  }

  obtenerCategoria(evento) {
    this.categoria = evento._element.nativeElement.title;
  }
  obtenerDestacacion(evento) {
    this.destacar = evento.value;
    if (this.destacar == 'SI') {
      this.seDestaca = true;
    } else {
      this.seDestaca = false;
    }
  }
  obtenerTipoAlquiler(evento) {
    this.tipoAlquiler = evento.value;
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

  }

  pasoImagen() {
    if (this.arrayImagenes.length = 0) {
      this.fotoProductoGroup.patchValue({
        multiplefile: [{ value: "" }, Validators.required]
      })
    } else {
      this.fotoProductoGroup.patchValue({
        multiplefile: [{ value: this.arrayImagenes }, Validators.required]
      })
    }
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

    this.tipoAlquilerGroup.patchValue({
      tipoAlquiler: this.tipoAlquiler
    })

    this.destacionProductoGroup.patchValue({
      destacar: this.destacar
    })


    this.joinGroup = {
      ...this.categoriaFormGroup.value,
      ...this.datosProductosGroup.value,
      ...this.fotoProductoGroup.value,
      ...this.destacionProductoGroup.value,
      ...this.tipoAlquilerGroup.value
    };

  }
  resetearDatos() {
    this.categoriaFormGroup.patchValue({
      categoria: [{ value: '' }],
      subcategoria: [{ value: '' }]
    })

    this.datosProductosGroup.patchValue({
      titulo: [{ value: '' }],
      descripcion: [{ value: '' }],
      preciodia: [{ value: '' }],
      preciosemana: [{ value: '' }],
      preciomes: [{ value: '' }]
    })

    this.fotoProductoGroup.patchValue({
      multiplefile:[{ value: '' }]


    })

    this.tipoAlquilerGroup.patchValue({
      tipoAlquiler: [{ value: '' }]
    })

    this.destacionProductoGroup.patchValue({
      destacar: [{ value: '' }]
    })

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
