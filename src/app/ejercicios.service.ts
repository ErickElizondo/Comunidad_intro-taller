import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EjerciciosService {

  constructor(private firestore: AngularFirestore) { }

  agregarEjercicio(empleado: any): Promise<any> {
    return this.firestore.collection('ejercicios').add(empleado);
  }

  getEjercicios(): Observable<any> {
    return this.firestore.collection('ejercicios', ref => ref.orderBy('fechaCreacion', 'desc')).snapshotChanges();
  }

  getEjerciciosTerm(termino: string): Observable<any> {
    return this.firestore.collection('ejercicios', ref => ref.orderBy("name").startAt(termino).endAt(termino + "\uf8ff")).snapshotChanges();
  }

  getCategoria(section: string): Observable<any> {
    return this.firestore.collection('ejercicios', ref => ref.where("section", "==", section)).snapshotChanges();
  }

  eliminarEjercicio(id: string): Promise<any> {
    return this.firestore.collection('ejercicios').doc(id).delete();
  }

  getEjercicio(id: string): Observable<any> {
    return this.firestore.collection('ejercicios').doc(id).snapshotChanges();
  }

  actualizarEjercicio(id: string, data:any): Promise<any> {
    return this.firestore.collection('ejercicios').doc(id).update(data);
  }
}
