import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerificarComprobanteComponent } from './verificar-comprobante.component';
import { AuthGuard } from '../../services/auth.guard';

const routes: Routes = [
  { path: '', component: VerificarComprobanteComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerificarComprobante { }
