import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from "../../core-angular-material/material.module";
import { EmpleadosRoutingModule } from './empleados-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmpleadosComponent } from './empleados.component';
import { EmpleadosEditComponent } from '../empleados-edit/empleados-edit.component';

@NgModule({
  declarations: [
    EmpleadosComponent,
    EmpleadosEditComponent
  ],
  imports: [
    CommonModule,
    EmpleadosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CustomMaterialModule
  ]
})
export class EmpleadosModule { }
