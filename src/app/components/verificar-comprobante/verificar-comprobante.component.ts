import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Socket } from 'ngx-socket-io';
import * as io from 'socket.io-client';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-verificar-comprobante',
  templateUrl: './verificar-comprobante.component.html',
  styleUrls: ['./verificar-comprobante.component.css']
})
export class VerificarComprobanteComponent implements OnInit {
  verificarComprobanteForm: FormGroup;
  public socket_recibe;

  constructor(
    private formBuilder: FormBuilder,
    private socket: Socket,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.socket_recibe = io('https://backend-inventario.herokuapp.com');
    this.socket_recibe.on('MENSAJE_VERIFICACION', (data) => {
      if(data == "1"){
        Swal.fire(
          'Está Declarado!',
          'El comprobante de pago está declarado correctamente en la SUNAT',
          'success'
        );
      }
      else{
        Swal.fire(
          'No está Declarado!',
          'El comprobante de pago no se encuentra declarado correctamente en la SUNAT',
          'error'
        );
      }
    });
  }

  private buildForm() {
    return this.verificarComprobanteForm = this.formBuilder.group({
      ruc: ['20601473047', [Validators.required]],
      tipo_comprobante: ['', [Validators.maxLength(60), Validators.minLength(4), Validators.required]],
      serie: ['E001', [Validators.required]],
      numero: ['', [Validators.maxLength(60), Validators.minLength(1), Validators.required]],
      fecha_emision: ['', [Validators.maxLength(60), Validators.minLength(1), Validators.required]],
      importe_total: ['', [Validators.maxLength(60), Validators.minLength(1), Validators.required]]
    });
  }

  consultar_comprobante(){
    if (this.verificarComprobanteForm.valid){
      var ruc = this.verificarComprobanteForm.value.ruc;
      var tipo_comprobante = this.verificarComprobanteForm.value.tipo_comprobante;
      var serie = this.verificarComprobanteForm.value.serie;
      var numero = this.verificarComprobanteForm.value.numero;
      var importe_total = this.verificarComprobanteForm.value.importe_total;
      var fecha = (<HTMLInputElement>document.getElementById("fechaEmision")).value;
      var fecha_emision = fecha.split("/")[2] + "-" + fecha.split("/")[1] + "-" + fecha.split("/")[0];
      
      // console.log(ruc);
      // console.log(tipo_comprobante);
      // console.log(serie);
      // console.log(numero);
      // console.log(fecha_emision);
      // console.log(importe_total);

      var comprobante = {ruc:ruc, tipo_comprobante:tipo_comprobante, serie:serie, numero:numero, fecha_emision:fecha_emision, importe_total:importe_total};
      //console.log(comprobante);
      this.socket.emit('ENVIAR_CONSULTA_COMPROBANTE', JSON.stringify(comprobante));
      
      // Swal.fire({
      //   type: 'success',
      //   title: 'La operación fue exitosa!',
      //   text: 'Comprobante verificado correctamente en la SUNAT'
      // });
    }
    else {
      Swal.fire({
        type: 'error',
        title: 'Error',
        text: 'Coloque correctamente los datos'
      })
    }
  }

  limpiar_comprobante(){
    this.verificarComprobanteForm.reset();
    this.buildForm();
  }
}
