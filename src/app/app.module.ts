import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { environment } from '../environments/environment';

//angularfire
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';;
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { EjerciciosComponent } from './ejercicios/ejercicios.component';
import { ListEjerciciosComponent } from './list-ejercicios/list-ejercicios.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EjerciciosComponent,
    ListEjerciciosComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
