import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { TerminosCondicionesComponent } from './components/terminos-condiciones/terminos-condiciones.component';
import { AboutComponent } from './components/about/about.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import { AuthRoutingModule } from './components/auth-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategoriasComponent } from './components/categorias/categorias.component'; 
import { ConfirmacionEmailComponent } from './components/confirmacionemail/confirmacionemail.component';
import { ConfirmaComponent } from './components/confirma/confirma.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './components/navigation/header/header.component';
import { FooterComponent } from './components/navigation/footer/footer.component';
import { SidenavListComponent } from './components/navigation/sidenav-list/sidenav-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PerfilUsuarioComponent,
    HomeComponent,
    ErrorComponent,
    TerminosCondicionesComponent,
    AboutComponent,
    RegisterComponent,
    CategoriasComponent,
    ConfirmacionEmailComponent,
    ConfirmaComponent,
    HeaderComponent,
    FooterComponent,
    SidenavListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    CommonModule,
    AuthRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    MaterialModule 
  ],
  providers: [appRoutingProviders, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
