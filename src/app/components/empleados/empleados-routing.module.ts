import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpleadosComponent } from './empleados.component';
import { AuthGuard } from '../../services/auth.guard';
import { EmpleadosEditComponent } from '../empleados-edit/empleados-edit.component';

const routes: Routes = [
  { path: '', component: EmpleadosComponent, canActivate: [AuthGuard] },
  { path: ':dni', component: EmpleadosEditComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadosRoutingModule { }
