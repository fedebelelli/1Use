import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { SwiperComponent, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UploadService } from 'src/app/services/upload.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-editar-publicacion',
  templateUrl: './editar-publicacion.component.html',
  styleUrls: ['./editar-publicacion.component.css'],
  providers: [UploadService]
})

export class EditarPublicacionComponent implements OnInit {

  @ViewChild(SwiperComponent, { static: false }) componentRef?: SwiperComponent;

  categoriaFormGroup: FormGroup;
  datosProductosGroup: FormGroup;
  fotoProductoGroup: FormGroup;
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
  tipoAlquiler: String;


  _id;


  /* Visualización de imagenes */
  public imagePath;
  imgURL: any;
  public message: string;
  public filesToUpload: Array<File>;
  hayImagen: boolean = false;
  arrayImagenes = null;

  /* Publicación de BD */
  publicacion;
  modoMobile: boolean = false;

  constructor(private _formBuilder: FormBuilder, private _auth: AuthService, private _uploadService: UploadService, private _snackBar: MatSnackBar) { }

  ngOnInit() {

    /*Inicialización de los formGroup */
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

    this.tipoAlquilerGroup = this._formBuilder.group({
      tipoAlquiler: [{ value: '' }, Validators.required]
    });

    this.joinGroup = {
      ...this.categoriaFormGroup.value,
      ...this.datosProductosGroup.value,
      ...this.fotoProductoGroup.value,
      ...this.tipoAlquilerGroup.value
    };

    /* Redefinir los formGroup */
    let url = window.location.href;
    this._id = url.substr(41);
    this._auth.get_publicacion_id(this._id).subscribe(
      err => {

        this.publicacion = err.publicaciones;

        this.categoria = this.publicacion.categoria
        this.subcategoria = this.publicacion.subcategoria
        this.titulo = this.publicacion.titulo
        this.descripcion = this.publicacion.descripcion
        this.preciodia = this.publicacion.preciodia
        this.preciosemana = this.publicacion.preciosemana
        this.preciomes = this.publicacion.preciomes
        this.image = this.publicacion.multiplefile
        this.tipoAlquiler = this.publicacion.tipoAlquiler

        this.categoriaFormGroup = this._formBuilder.group({
          categoria: [this.publicacion.categoria],
          subcategoria: [this.publicacion.subcategoria, Validators.required]
        });

        this.datosProductosGroup = this._formBuilder.group({
          titulo: [{ value: this.publicacion.titulo }, Validators.required],
          descripcion: [{ value: this.publicacion.descripcion }, Validators.required],
          preciodia: [{ value: this.publicacion.preciodia }, Validators.required],
          preciosemana: [{ value: this.publicacion.preciosemana }],
          preciomes: [{ value: this.publicacion.preciomes }]
        });

        this.fotoProductoGroup = this._formBuilder.group({
          multiplefile: [{ value: this.publicacion.multiplefile }, Validators.required]
        });

        this.tipoAlquilerGroup = this._formBuilder.group({
          tipoAlquiler: [{ value: this.publicacion.tipoAlquiler }, Validators.required]
        });

        this.joinGroup = {
          ...this.categoriaFormGroup.value,
          ...this.datosProductosGroup.value,
          ...this.fotoProductoGroup.value,
          ...this.tipoAlquilerGroup.value
        };
      },
      res => {

      }
    )

  }

  obtenerSubCategoria(evento) {
    this.subcategoria = evento.value;
  }

  obtenerCategoria(evento) {
    this.categoria = evento._element.nativeElement.title;
  }

  obtenerTipoAlquiler(evento) {
    this.tipoAlquiler = evento.value;
  }

  onFilesAdded(files: File[]) {
    if (files.length > 5) {
      this._snackBar.open("No se pueden ingresar más de 5 imágenes", "Aceptar")
      this.image = [];
      this.arrayImagenes = [];
      this.fotoProductoGroup.patchValue({
        multiplefile: [{ value: "" }, Validators.required]
      })
    }
    else {
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
      this.fotoProductoGroup.patchValue({
        multiplefile: [{ value: this.arrayImagenes }, Validators.required]
      })
    }
  }

  checkCantidad() {
    if (this.arrayImagenes.length > 5) {
      this.fotoProductoGroup.patchValue({
        multiplefile: [{ value: "" }, Validators.required]
      })
    }
  }

  /* Solo va a servir si se quieren agregar más imágenes al cuadrado, además de la que ya están
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
  } */


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


    this.joinGroup = {
      ...this.categoriaFormGroup.value,
      ...this.datosProductosGroup.value,
      ...this.fotoProductoGroup.value,
      ...this.tipoAlquilerGroup.value
    };

  }


  resetearDatos() {
    this.categoriaFormGroup.reset()

    this.datosProductosGroup.reset()

    this.fotoProductoGroup.reset()

    this.tipoAlquilerGroup.reset()


    this.categoria = '';
    this.subcategoria = '';
    this.titulo = '';
    this.descripcion = '';
    this.preciodia = null;
    this.preciosemana = null;
    this.preciomes = null;
    this.image = '';
    this.tipoAlquiler = ''

    this.joinGroup = {
      ...this.categoriaFormGroup.value,
      ...this.datosProductosGroup.value,
      ...this.fotoProductoGroup.value,
      ...this.tipoAlquilerGroup.value
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
              window.location.assign("/publicacion-exito");
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


  //SWIPER
  public config: SwiperConfigInterface = {
    a11y: true,
    direction: 'horizontal',
    slidesPerView: 5
  };

  //Snackbar
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['color-snackbar']
    });
  }


  /*Para activar modo mobile o no */
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (this.modoMobile == false) {
      this.modoMobile = true;
    }
    else {
      this.modoMobile = false;
    }

  }

}
