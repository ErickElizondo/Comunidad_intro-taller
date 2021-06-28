import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
import { TarjetasComponent } from './components/tarjetas/tarjetas.component';
import { ListEjerciciosComponent } from './list-ejercicios/list-ejercicios.component';
import { LoadingComponent } from './components/loading/loading.component';
import { EjercicioComponent } from './components/ejercicio/ejercicio.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { SearchComponent } from './components/search/search.component';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EjerciciosComponent,
    ListEjerciciosComponent,
    TarjetasComponent,
    LoadingComponent,
    EjercicioComponent,
    CategoriaComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AppRoutingModule,
    HighlightModule,
    NgbModule
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          python: () => import('highlight.js/lib/languages/python')
        }
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
