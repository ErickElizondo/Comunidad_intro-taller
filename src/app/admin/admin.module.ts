import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { ListEjerciciosComponent } from '../list-ejercicios/list-ejercicios.component';


@NgModule({
  imports: [
    AdminRoutingModule,
   CommonModule
  ],
  declarations: [AdminComponent]
})
export class AdminModule { }
