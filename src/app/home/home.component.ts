import { Component, OnInit } from '@angular/core';
import { EjerciciosService } from "src/app/ejercicios.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ejercicios: any[] = [];
  ejerciciosA: any[] = [];
  ejerciciosB: any[] = [];
  ejerciciosC: any[] = [];
  loading: boolean;

  // mensaje de error en home
  errorFlag: boolean;
  errorMessage: string;

  constructor(private ejercicio_Service: EjerciciosService) {
    this.errorFlag = false;
    this.loading = true;
  }

  getEjercicios() {
    this.ejercicio_Service.getEjercicios()
      .subscribe(data => {
        this.loading = false;
        data.some((element: any) => {
          this.ejercicios.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          })
        });
        this.ejerciciosA = this.ejercicios.filter(ejercicio => ejercicio.section == "Árboles");
        this.ejerciciosB = this.ejercicios.filter(ejercicio => ejercicio.section == "Listas, vectores y matrices");
        this.ejerciciosC = this.ejercicios.filter(ejercicio => ejercicio.section == "Algoritmos numéricos");
      }, (errorService) => {
        console.log("Error");
        this.errorFlag = true;
        this.loading = false;
        this.errorMessage = errorService.error.error.message;
      });
  }

  ngOnInit() {
    this.getEjercicios();
  }
}
