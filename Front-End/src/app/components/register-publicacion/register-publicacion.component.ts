import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-register-publicacion ',
  templateUrl: './register-publicacion.component.html',
  styleUrls: ['./register-publicacion.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class RegisterPublicacionComponent implements OnInit {

  primerFormGroup: FormGroup;
  segundoFormGroup: FormGroup;
  tercerFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.primerFormGroup = this._formBuilder.group({
      primerCtrl: ['', Validators.required]
    });
    this.segundoFormGroup = this._formBuilder.group({
      segundoCtrl: ['', Validators.required]
    });
    this.tercerFormGroup = this._formBuilder.group({
      tercerCtrl: ['', Validators.required]
    });
  }

  electronicaArray: string[] = ['TV - Audio - Video', 'Celulares - Tablets', 'Computadoras', 'Notebooks', 'Videojuegos', 'Consolas', 'Cámaras y accesorios']
  hogarArray: string[] = ['Accesorios', 'Decoración', 'Electrodomésticos', 'Muebles', 'Jardin']
  deportesArray: string[] = ['Aerobics y fitness', 'Bicicletas y ciclismo', 'Camping y pesca', 'Deportes acuaticos', 'Futbol', 'Otros deportes']
  musicaArray: string[] = ['Arte y antiguedades', 'CDs - DVDs', 'Instrumentos musicales', 'Libros y revistas']
  bellezaArray: string[] = ['Relojes - joyas - accesorios', 'Ropa y calzado', 'Salud y belleza']
  bebesArray: string[] = ['Cunas - Accesorios', 'Juegos - juguetes', 'Ropa bebés y niños']
  animalesArray: string[] = ['Accesorios para perros', 'Accesorios para gatos', 'Otros']
  herramientasArray: string[] = ['Industria','Herramientas', 'Muebles para negocios - oficinas']
  

}
