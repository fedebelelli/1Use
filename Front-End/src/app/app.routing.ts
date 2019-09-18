import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { TerminosCondicionesComponent } from './components/terminos-condiciones/terminos-condiciones.component';
import { PerfilUsuarioComponent } from './components/mi-cuenta/perfil-usuario/perfil-usuario.component';
import { AboutComponent } from './components/about/about.component';
import { RegisterComponent } from './components/register/register.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { ConfirmacionEmailComponent } from './components/confirmacionemail/confirmacionemail.component';
import { ConfirmaComponent } from './components/confirma/confirma.component';
import { RegisterPublicacionComponent } from './components/register-publicacion/register-publicacion.component';
import { PublicacionExitoComponent } from './components/publicacion-exito/publicacion-exito.component';
import { DestacacionPublicacionComponent } from './components/destacacion-publicacion/destacacion-publicacion.component';
import { MiCuentaComponent } from './components/mi-cuenta/mi-cuenta.component';
import { MisPublicacionesComponent } from './components//mi-cuenta/mis-publicaciones/mis-publicaciones.component';
import { MisAlquileresComponent } from './components//mi-cuenta/mis-alquileres/mis-alquileres.component';
import {ConfirmacionDestacacionComponent} from './components/confirmacion-destacacion/confirmacion-destacacion.component';
import { DetallePublicacionComponent } from './components/publicaciones/detalle-publicacion/detalle-publicacion.component';
import { EditarPublicacionComponent } from './components/publicaciones/editar-publicacion/editar-publicacion.component';
import { BusquedaCategoriasComponent } from './components/busqueda/busqueda-categorias/busqueda-categorias.component';
import { BusquedaPublicacionesComponent } from './components/busqueda/busqueda-publicaciones/busqueda-publicaciones.component';
import { LostPasswordComponent } from './components/login/lostpassword/lostpassword.component';
import { ConfirmaLostPasswordComponent } from './components/login/lostpassword/confirmalostpassword/confirmalostpassword.component';

const appRoutes: Routes = [

    { path: '',  redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'lostpassword', component: LostPasswordComponent }, 
    { path: 'confirmalostpassword', component: ConfirmaLostPasswordComponent }, 
    { path: 'terminos-condiciones', component: TerminosCondicionesComponent },
    { path: 'about', component: AboutComponent },
    { path: 'register', component: RegisterComponent },
    /* { path: 'auth', loadChildren: './components/auth.module#AuthModule' }, */
    { path: 'categorias', component: CategoriasComponent },
    { path: 'confirmacionemail/:token', component: ConfirmacionEmailComponent },
    { path: 'confirma', component: ConfirmaComponent },
    { path: 'register-publicacion', component: RegisterPublicacionComponent },
    { path: 'publicacion-exito', component: PublicacionExitoComponent },
    { path: 'destacacion-publicacion', component: DestacacionPublicacionComponent },
    { path: 'mi-cuenta', component: MiCuentaComponent, },
    { path: 'mi-cuenta/perfil', component: PerfilUsuarioComponent },
    { path: 'mi-cuenta/mis-alquileres', component: MisAlquileresComponent },
    { path: 'mi-cuenta/mis-publicaciones', component: MisPublicacionesComponent },
    { path: 'confirmacion-destacacion', component: ConfirmacionDestacacionComponent },
    { path: 'publicaciones/:id', component: DetallePublicacionComponent },
    { path: 'editar-publicacion/:id', component: EditarPublicacionComponent },
    { path: 'busqueda/c/:c', component: BusquedaCategoriasComponent },
    { path: 'busqueda/p/:p', component: BusquedaPublicacionesComponent },
    { path: '**', component: ErrorComponent },

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);