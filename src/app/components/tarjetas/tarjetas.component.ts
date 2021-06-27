import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent implements OnInit {

  @Input() items: any[] = [];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  verEjercicio(item: any){
    let ejercicioId;
  
    ejercicioId = item.id;
    this.router.navigate(['/ejercicio', ejercicioId]);  
  }
}