import { Component, OnInit } from '@angular/core';

import { FirebaseService } from "../firebase.service";
import { Router } from "@angular/router";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Item { code: string; name: string; details: string; examples: string[] }

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  constructor(private afs: AngularFirestore, private firebaseService: FirebaseService, private router: Router) {
    this.itemsCollection = afs.collection<Item>('ejercicios');
    this.items = this.itemsCollection.valueChanges();
  }

  ngOnInit() {
  }

  addItem(item: Item) {
    this.itemsCollection.add(item);
  }
}
