import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', canActivate:[AuthGuard], data: {roles: ["user", "admin"]} , loadChildren: './student/student.module#StudentModule' },  
  { path: 'home', component: HomeComponent },
  { path: 'signup', loadChildren: './signup/signup.module#SignupModule' },
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: 'admin', canActivate:[AuthGuard], data: {roles: ["admin"]} ,loadChildren: './admin/admin.module#AdminModule' },
  { path: 'student', canActivate:[AuthGuard], data: {roles: ["user"]} ,loadChildren: './student/student.module#StudentModule' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: "enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
