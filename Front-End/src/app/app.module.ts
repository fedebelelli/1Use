import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilUsuarioComponent } from './components/mi-cuenta/perfil-usuario/perfil-usuario.component';
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
import { RegisterPublicacionComponent } from './components/register-publicacion/register-publicacion.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './components/navigation/header/header.component';
import { FooterComponent } from './components/navigation/footer/footer.component';
import { SidenavListComponent } from './components/navigation/sidenav-list/sidenav-list.component';
import { SingletonService } from './components/singleton.service'
import { DropdownModule } from 'angular-custom-dropdown'
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { PublicacionExitoComponent } from './components/publicacion-exito/publicacion-exito.component';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { DestacacionPublicacionComponent } from './components/destacacion-publicacion/destacacion-publicacion.component';
import { MiCuentaComponent } from './components/mi-cuenta/mi-cuenta.component';
import { MisPublicacionesComponent } from './components//mi-cuenta/mis-publicaciones/mis-publicaciones.component';
import { MisAlquileresComponent } from './components//mi-cuenta/mis-alquileres/mis-alquileres.component';
import { ConfirmacionDestacacionComponent } from './components/confirmacion-destacacion/confirmacion-destacacion.component';
import { DetallePublicacionComponent } from './components/publicaciones/detalle-publicacion/detalle-publicacion.component';
import { EditarPublicacionComponent } from './components/publicaciones/editar-publicacion/editar-publicacion.component';
import { BusquedaPublicacionesComponent } from './components/busqueda/busqueda-publicaciones/busqueda-publicaciones.component';
import { BusquedaCategoriasComponent } from './components/busqueda/busqueda-categorias/busqueda-categorias.component';
import { SoloNumerosDirective } from './components/mi-cuenta/perfil-usuario/inputSoloNumeros.directive';
import { SoloLetrasDirective } from './components/mi-cuenta/perfil-usuario/inputSoloLetras.directive';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { LostPasswordComponent } from './components/login/lostpassword/lostpassword.component';
import { ConfirmaLostPasswordComponent } from './components/login/lostpassword/confirmalostpassword/confirmalostpassword.component';
import { PosAlquilerComponent } from './components/pos-alquiler/pos-alquiler.component';
import { MisPublicacionesDialogComponent } from './components/mi-cuenta/mis-publicaciones/mis-publicaciones-dialog/mis-publicaciones-dialog.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
  direction: 'horizontal',
  slidesPerView: 'auto'
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LostPasswordComponent,
    ConfirmaLostPasswordComponent,
    PerfilUsuarioComponent,
    HomeComponent,
    ErrorComponent,
    TerminosCondicionesComponent,
    AboutComponent,
    RegisterComponent,
    CategoriasComponent,
    RegisterPublicacionComponent,
    ConfirmacionEmailComponent,
    ConfirmaComponent,
    HeaderComponent,
    FooterComponent,
    SidenavListComponent,
    PublicacionExitoComponent,
    DestacacionPublicacionComponent,
    MiCuentaComponent,
    MisPublicacionesComponent,
    MisAlquileresComponent,
    ConfirmacionDestacacionComponent,
    DetallePublicacionComponent,
    EditarPublicacionComponent, 
    BusquedaPublicacionesComponent, 
    BusquedaCategoriasComponent,
    SoloNumerosDirective,
    BusquedaComponent,
    SoloLetrasDirective,
    SoloNumerosDirective,
    PosAlquilerComponent,
    MisPublicacionesDialogComponent
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
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    MaterialModule,
    DropdownModule,
    MaterialFileInputModule,
    NgxDropzoneModule,
    SwiperModule,
  ],
  providers: [appRoutingProviders, AuthService, SingletonService, { provide: SWIPER_CONFIG, useValue: DEFAULT_SWIPER_CONFIG }],
  bootstrap: [AppComponent],
  entryComponents: [MisPublicacionesDialogComponent]
})
export class AppModule { }
