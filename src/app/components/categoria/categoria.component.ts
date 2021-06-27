import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EjerciciosService } from 'src/app/ejercicios.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  categoria: string;

  ejercicios: any[] = [];
  loading: boolean;

  // mensaje de error en home
  errorFlag: boolean;
  errorMessage: string;

  constructor(private ejercicio_Service: EjerciciosService, private router: ActivatedRoute) {
    this.categoria = this.router.snapshot.paramMap.get('section');
    this.getCategoria(this.categoria); 
    this.errorFlag = false;
    this.loading = true;
  }

  getCategoria(section: string) {
    this.ejercicio_Service.getCategoria(section)
      .subscribe(data => {
        this.loading = false;
        data.some((element: any) => {
          this.ejercicios.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          })
        });
        console.log(this.ejercicios);
      }, (errorService) => {
        console.log("Error");
        this.errorFlag = true;
        this.loading = false;
        this.errorMessage = errorService.error.error.message;
      });
  }

  ngOnInit() {
  }

}
