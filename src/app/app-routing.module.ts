import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { CategoriaComponent } from './components/categoria/categoria.component';
import { EjercicioComponent } from './components/ejercicio/ejercicio.component';
import { SearchComponent } from './components/search/search.component';
import { EjerciciosComponent } from './ejercicios/ejercicios.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'signup', loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule) },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'admin', canActivate: [AuthGuard], data: { roles: ["admin"] }, loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'admin', canActivate: [AuthGuard], data: { roles: ["admin"] }, loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'admin/read/:id', component: EjerciciosComponent, canActivate: [AuthGuard], data: { roles: ["admin"] } },
  { path: 'admin/create', component: EjerciciosComponent, canActivate: [AuthGuard], data: { roles: ["admin"] } },
  { path: 'admin/update/:id', component: EjerciciosComponent, canActivate: [AuthGuard], data: { roles: ["admin"] } },
  { path: 'ejercicio/:id', component: EjercicioComponent },
  { path: 'categoria/:section', component: CategoriaComponent },
  { path: 'search', component: SearchComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled", relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
