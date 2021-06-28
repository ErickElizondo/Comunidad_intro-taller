import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HighlightResult } from 'ngx-highlightjs';
import { EjerciciosService } from 'src/app/ejercicios.service';

@Component({
  selector: 'app-ejercicio',
  templateUrl: './ejercicio.component.html',
  styleUrls: ['./ejercicio.component.css']
})
export class EjercicioComponent implements OnInit {

  idEjercicio: string;
  response: HighlightResult;

  ejercicio: any = {};
  loading: boolean;
  errorFlag: boolean;
  errorMessage: any;

  selected: string;
  hovered: string;

  constructor(private ejercicio_Service: EjerciciosService, private router: ActivatedRoute) {
    this.idEjercicio = this.router.snapshot.paramMap.get('id');
    this.getEjercicio(this.idEjercicio);
  }

  getEjercicio(idEjercicio: string) {
    this.loading = true;
    this.ejercicio_Service.getEjercicio(idEjercicio)
      .subscribe(data => { 
        this.ejercicio = {
          id: data.payload.id,
          ...data.payload.data()
        }
        this.loading = false;
        this.selected = this.ejercicio.level;
        console.log(this.ejercicio);
      }, (errorService) => {
        console.log("Error");
        this.errorFlag = true;
        this.loading = false;
        this.errorMessage = errorService.error.error.message;
      });
  }

  onHighlight(e) {
    this.response = {
      language: e.language,
      relevance: e.relevance,
      second_best: '{...}',
      top: '{...}',
      value: '{...}'
    }
  }

  mostrar(selected: string) {
    console.log(selected);
    
    this.ejercicio_Service.actualizarLevel(this.ejercicio.id, selected);
  }

  ngOnInit() {
  }

}
