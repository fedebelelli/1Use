import { Component, OnInit } from '@angular/core';
import{FormBuilder, FormGroup, Validators} from  '@angular/forms' ;
import {STEPPER_GLOBAL_OPTIONS} from  '@angular/cdk/stepper' ;

@Component({
  selector: 'app-register-publicacion ',
  templateUrl: './register-publicacion.component.html',
  styleUrls: ['./register-publicacion.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
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

  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
}
