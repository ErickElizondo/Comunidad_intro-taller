import { Component, OnInit } from '@angular/core';
import { EjerciciosService } from '../ejercicios.service';
@Component({
  selector: 'app-list-ejercicios',
  templateUrl: './list-ejercicios.component.html',
  styleUrls: ['./list-ejercicios.component.css']
})
export class ListEjerciciosComponent implements OnInit {

  constructor(private _ejercicioService: EjerciciosService) { }

  ngOnInit() {
    this.getEjercicios();
  }
  ejercicios: any[] = [];
  getEjercicios() {
    this._ejercicioService.getEjercicios().subscribe(data => {
      this.ejercicios = [];
      data.forEach((element: any) => {
        this.ejercicios.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    });
  }

  eliminarEjercicio(id: string) {
    this._ejercicioService.eliminarEjercicio(id).then(() => {
      console.log('Ejercicio eliminado con exito');

    }).catch(error => {
      console.log(error);
    })
  }

}
