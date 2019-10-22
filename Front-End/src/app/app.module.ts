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
import { LostPasswordComponent } from './components/login/lostpassword/lostpassword.component';
import { ConfirmaLostPasswordComponent } from './components/login/lostpassword/confirmalostpassword/confirmalostpassword.component';
import { PosAlquilerComponent } from './components/pos-alquiler/pos-alquiler.component';
import { DeshabilitarDialogComponent } from './components/mi-cuenta/mis-publicaciones/deshabilitar-dialog/dehsabilitar-dialog';
import { EliminarDialogComponent } from './components/mi-cuenta/mis-publicaciones/eliminar-dialog/eliminar-dialog.component';
import { NotificacionesComponent } from './components/mi-cuenta/notificaciones/notificaciones.component';
import { ConfirmacionAlquilerComponent } from './components/confirmacion-alquiler/confirmacion-alquiler.component';
import { NewpwdComponent } from './components/newpwd/newpwd.component';
import { DatosPropietarioDialogComponent } from './components/mi-cuenta/mis-alquileres/datos-propietario-dialog/datos-propietario-dialog.component';
import { EliminarAlquilerDialogComponent } from './components/mi-cuenta/mis-alquileres/eliminar-alquiler-dialog/eliminar-alquiler-dialog.component';
import { DatosLocatarioDialogComponent } from './components/mi-cuenta/mis-alquileres/datos-locatario-dialog/datos-locatario-dialog.component';
import { CodigoLocatarioDialogComponent } from './components/mi-cuenta/mis-alquileres/codigo-locatario-dialog/codigo-locatario-dialog.component';
import { CodigoPropietarioDialogComponent } from './components/mi-cuenta/mis-alquileres/codigo-propietario-dialog/codigo-propietario-dialog.component';
<<<<<<< HEAD
import { StarRatingComponent } from './components/busqueda/busqueda-publicaciones/star-rating.component'
=======
import { CancelarAlquilerComponent } from './components/cancelar-alquiler/cancelar-alquiler.component';
import { SearchPipe } from './search.pipe';
>>>>>>> Cancelar alquiler

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
    SoloLetrasDirective,
    SoloNumerosDirective,
    PosAlquilerComponent,
    DeshabilitarDialogComponent,
    EliminarDialogComponent,
    NotificacionesComponent,
    ConfirmacionAlquilerComponent,
    NewpwdComponent,
    DatosPropietarioDialogComponent,
    EliminarAlquilerDialogComponent,
    DatosLocatarioDialogComponent,
    CodigoLocatarioDialogComponent,
    CodigoPropietarioDialogComponent,
<<<<<<< HEAD
    StarRatingComponent
=======
    CancelarAlquilerComponent,
    SearchPipe
>>>>>>> Cancelar alquiler
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
  entryComponents: [DeshabilitarDialogComponent, EliminarDialogComponent, DatosPropietarioDialogComponent, EliminarAlquilerDialogComponent, 
    DatosLocatarioDialogComponent, CodigoPropietarioDialogComponent, CodigoLocatarioDialogComponent]
})
export class AppModule { }
