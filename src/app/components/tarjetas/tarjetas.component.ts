import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { EjerciciosService } from 'src/app/ejercicios.service';
import { FirebaseService } from 'src/app/firebase.service';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent implements OnInit {

  @Input() items: any[] = [];

  constructor(private router: Router, private firebaseService: FirebaseService, private _ejercicioService: EjerciciosService, private test: AppComponent) { }

  userStatus: any = this.firebaseService;
  ngOnInit(): void {
    this.userStatus = this.test.getUser().then(x =>{
      this.userStatus = x;
    });
    
    
  }

  verEjercicio(item: any){
    let ejercicioId;
  
    ejercicioId = item.id;
    this.router.navigate(['/ejercicio', ejercicioId]);  
  }

  eliminarEjercicio(id: string) {
    this._ejercicioService.eliminarEjercicio(id).then(() => {
      console.log('Ejercicio eliminado con exito');
      window.location.reload();      
    }).catch(error => {
      console.log(error);
    })
    
  }
}