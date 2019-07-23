import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide = true;
  hide2 = true;

  minPw = 8;
  formGroup: FormGroup;

  registerUserData = {}

  emailPattern: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  passwordPattern:  " ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}$";

constructor( private _auth: AuthService, private FormBuilder: FormBuilder, private _router: Router ){ }


 

  ngOnInit() {
     this.formGroup = this.FormBuilder.group({
       password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
       password2: ['', [Validators.required]],
       name: ['', [Validators.required]],
      email: ['', [Validators.required,  Validators.pattern(this.emailPattern)]],
     }, { validator: passwordMatchValidator });
  }

  registerUser(){

    this ._auth.registerUser(this.registerUserData).subscribe(

        res => {
          
          console.log(res)
          localStorage.setItem('token', res.token)
          this._router.navigate(['/home'])
        },
        err => console.log(err)

      )

    //console.log(this.registerUserData)

  }


   /* Shorthands for form controls (used from within template) */
   get password() { return this.formGroup.get('password'); }
   get password2() { return this.formGroup.get('password2'); }
   get name() { return this.formGroup.get('name'); }
   get email() { return this.formGroup.get('email'); }
   /* Called on each input in either password field */
   onPasswordInput() {
     if (this.formGroup.hasError('passwordMismatch'))
       this.password2.setErrors([{ 'passwordMismatch': true }]);
     else
       this.password2.setErrors(null);
   }

 }

 export const passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
   if (formGroup.get('password').value === formGroup.get('password2').value)
     return null;
   else
     return { passwordMismatch: true };
 };

