import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmpleadoService } from '../../services/empleados.service';
import { Rol } from '../../helpers/role.helper'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-empleados-edit',
  templateUrl: './empleados-edit.component.html',
  styleUrls: ['./empleados-edit.component.css'],
  providers: [EmpleadoService]
})
export class EmpleadosEditComponent implements OnInit {
  public dniParam: string;
  editEmpleadoForm: FormGroup;
  public empleado: any;
  roles: Rol[] = [
    { value: 'ADMIN', viewValue: 'Admin' },
    { value: 'COMPRAS', viewValue: 'Compras' },
    { value: 'VENTAS', viewValue: 'Ventas' }
  ];

  constructor(
    private _empleadoService: EmpleadoService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _router: Router
  ) { }

  ngOnInit() {
    this.dniParam = this.route.snapshot.paramMap.get('dni');
    this.buildForm();
    this._empleadoService.buscarEmpleado(this.dniParam).subscribe(
      res => {
        //console.log(res);
        this.empleado = res.empleado[0];
        //console.log(this.empleado)
        this.editEmpleadoForm.patchValue({
          nombres: this.empleado.nombres,
          apellidos: this.empleado.apellidos,
          direccion: this.empleado.direccion,
          email: this.empleado.email,
          dni: this.empleado.dni,
          edad: this.empleado.edad,
          role: this.empleado.role
        })
      }
    )
  }

  private buildForm() {
    return this.editEmpleadoForm = this.formBuilder.group({
      nombres: ['', [Validators.maxLength(60), Validators.minLength(4), Validators.required]],
      apellidos: ['', [Validators.maxLength(60), Validators.minLength(4), Validators.required]],
      direccion: ['', [Validators.maxLength(80), Validators.minLength(10), Validators.required]],
      email: ['', [Validators.required]],
      dni: ['', [Validators.maxLength(8), Validators.required]],
      edad: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      role: ['', [Validators.required]]
    });
  }

  onSubmit() {
    console.log('form', this.editEmpleadoForm.value)
    if (this.editEmpleadoForm.valid)
      this._empleadoService.actualizarEmpleado(this.empleado._id, this.editEmpleadoForm.value).subscribe(
        res => {
          Swal.fire({
            type: 'success',
            title: 'La operación fue exitosa!',
            text: 'Editado correctamente.'
          }).then((result) => {
            if (result.value) {
              this._router.navigateByUrl('/home/empleados')
            }
          });
        },
        err => { console.log(err) }
      )
    else {
      Swal.fire({
        type: 'error',
        title: 'Error',
        text: 'Coloque correctamente los datos'
      })
    }
  }


}
