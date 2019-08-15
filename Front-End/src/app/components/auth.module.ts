import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from '../services/auth.service';
import { CategoriasComponent } from './categorias/categorias.component';
import { ConfirmaComponent } from './confirma/confirma.component';
import { RegisterPublicacionComponent } from './register-publicacion/register-publicacion.component';


@NgModule({
  declarations: [RegisterComponent, LoginComponent, ConfirmaComponent, RegisterPublicacionComponent],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    HttpClientModule
  ],

  providers: [AuthService]

})
export class AuthModule { }
