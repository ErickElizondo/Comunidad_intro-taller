import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EjerciciosService } from 'src/app/ejercicios.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  ejercicios: any[] = [];
  busqueda: any[] = [];
  loading: boolean;
  errorFlag: boolean;
  errorMessage: string;
  estrellaSelected: boolean;

  tipoBusqueda: string = "name";
  nValores: string = "";
  currentRate: string = "1";

  constructor(private ejercicio_Service: EjerciciosService) {
    this.errorFlag = false;
  }

  tipo(value: string) {
    console.log(value);
    this.tipoBusqueda = value;
  }

  valores(nValores: string) {
    this.estrellaSelected = false;
    this.currentRate = "1";
    console.log(nValores);
    this.nValores = nValores;
    this.filtrarCantidad();
  }

  buscar(termino: string) {
    this.busqueda = [];
    if (termino != "") {
      const arreglo = [...this.ejercicios];
      let buscar = termino.toLowerCase();

      arreglo.forEach(element => {
        if (+element.level == +this.currentRate) {
          if (this.tipoBusqueda == "name") {
            if (element.name.toLocaleLowerCase().includes(buscar)) {
              this.busqueda.push(element);
            }
          }
          else if (this.tipoBusqueda == "section") {
            if (element.section.toLocaleLowerCase().includes(buscar)) {
              this.busqueda.push(element);
            }
          }
          else {
            if (element.details.toLocaleLowerCase().includes(buscar)) {
              this.busqueda.push(element);
            }
          }
        }
      });
    }
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
      }, (errorService) => {
        console.log("Error");
        this.errorFlag = true;
        this.loading = false;
        this.errorMessage = errorService.error.error.message;
      });
  }

  filtrarCantidad() {
    setTimeout(() => {
      this.busqueda = [];
      const arreglo = [...this.ejercicios];
      console.log(this.ejercicios);
      this.busqueda = arreglo.slice(0, +this.nValores); 
    }, 100)
  }

  ngOnInit() {
    this.getEjercicios()
  }

  filtrarEstrella(){
    setTimeout(() => {
      this.estrellaSelected = true;
      this.busqueda = [];
      const arreglo = [...this.ejercicios];
      arreglo.forEach(element => {
        if (+element.level == +this.currentRate) {
          this.busqueda.push(element);
        }
      }); 
    }, 100)
    
  }

}
