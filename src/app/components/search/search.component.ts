import { Component, OnInit } from '@angular/core';
import { EjerciciosService } from 'src/app/ejercicios.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  ejercicios: any[] = [];
  loading: boolean;
  errorFlag: boolean;
  errorMessage: string;

  constructor(private ejercicio_Service: EjerciciosService) { }

  buscar(termino: string) {
    this.ejercicios = [];
    if (termino != "") {
      this.loading = true;
      this.ejercicio_Service.getEjerciciosTerm(termino)
        .subscribe((data: any) => {
          data.some((element: any) => {
            this.ejercicios.push({
              id: element.payload.doc.id,
              ...element.payload.doc.data()
            })
          });
          console.log(this.ejercicios);
          this.loading = false;
        }, (errorService) => {
          this.loading = false;
          this.ejercicios = [];
          this.errorMessage = errorService.error.error.message;
        });
    }
  }

  ngOnInit() {
  }

}
