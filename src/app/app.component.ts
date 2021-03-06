import { Component, OnInit } from '@angular/core';
import { FirebaseService } from "./firebase.service";
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-rolebased';

  data = [] //Aquí se añade el JSON que mandó el profe, o bien construir uno para añadirlo a la db, siempre y cuando
  //cumpla con la estructura establecida.

  constructor(private firebaseService: FirebaseService, private firestore: AngularFirestore) { }

  userStatus: any = this.firebaseService;

  logout() {
    this.firebaseService.logOut();

  }

  ngOnInit() {
    this.firebaseService.userChanges();

    this.firebaseService.userStatusChanges.subscribe(x => this.userStatus = x);
  }

  getUser(): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      let user: any;
      this.firebaseService.userStatusChanges.subscribe(x => {
        user = x;
      });
      resolve(user);
    });
    
  }
}
