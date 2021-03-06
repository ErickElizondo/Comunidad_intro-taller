import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EjerciciosService {

  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) { }

  agregarEjercicio(empleado: any): Promise<any> {
    return this.firestore.collection('ejercicios').add(empleado);
  }

  getEjercicios(): Observable<any> {
    return this.firestore.collection('ejercicios', ref => ref.orderBy('fechaCreacion', 'asc')).snapshotChanges();
  }

  getEjerciciosTerm(termino: string): Observable<any> {
    return this.firestore.collection('ejercicios', ref => ref.orderBy("name").startAt(termino).endAt(termino + "\uf8ff")).snapshotChanges();
  }

  getCategoria(section: string): Observable<any> {
    return this.firestore.collection('ejercicios', ref => ref.where("section", "==", section)).snapshotChanges();
  }

  eliminarEjercicio(id: string): Promise<any> {
    
    if(confirm("Estás seguro?")){
      return this.firestore.collection('ejercicios').doc(id).delete();
    }
    
  }

  getEjercicio(id: string): Observable<any> {
    return this.firestore.collection('ejercicios').doc(id).snapshotChanges();
  }

  actualizarEjercicio(id: string, data:any): Promise<any> {
    return this.firestore.collection('ejercicios').doc(id).update(data);
  }

  actualizarLevel(id: string, data:string): Promise<any> {
    return this.firestore.collection('ejercicios').doc(id).update({level: data});
  }

  public tareaCloudStorage(nombreArchivo: string, datos: any){
    return this.storage.upload(nombreArchivo, datos);
  }

  public referenciaCloudStorage(nombreArchivo: string){
    return this.storage.ref(nombreArchivo);
  }

}
