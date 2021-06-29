import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EjerciciosService } from '../ejercicios.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router, private _ejercicioService: EjerciciosService) { }

  ngOnInit() {
    this.getEjercicios();
  }

  goToCreate(){
    this.router.navigate(["/admin/create"])
  }

  goToRead(){
    this.router.navigate(["/admin/read"])
  }

  goToUpdate(){
    this.router.navigate(["/admin/update"])
  }

  goToDelete(){
    this.router.navigate(["/admin/delete"])
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
