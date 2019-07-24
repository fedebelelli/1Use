import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { TerminosCondicionesComponent } from './components/terminos-condiciones/terminos-condiciones.component';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';
import { AboutComponent } from './components/about/about.component';
import { RegisterComponent } from './components/register/register.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { ConfirmacionEmailComponent } from './components/confirmacionemail/confirmacionemail.component';
import { ConfirmaComponent } from './components/confirma/confirma.component';
const appRoutes: Routes = [

    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'terminos-condiciones', component: TerminosCondicionesComponent},
    {path: 'perfil', component: PerfilUsuarioComponent},
    {path: 'about', component: AboutComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'auth', loadChildren: './components/auth.module#AuthModule'},
    {path: '*', component: ErrorComponent},
    {path: 'categorias', component: CategoriasComponent},
    {path: 'confirmacionemail/:token', component: ConfirmacionEmailComponent},
    {path: 'confirma', component: ConfirmaComponent},

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);