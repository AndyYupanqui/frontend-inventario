import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';

@Injectable()
export class EmpleadoService {
    public url: string;

    constructor(private _http: HttpClient) {
        this.url = Global.url
    }

    listarEmpleados(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + '/empleados', { headers: headers });
    }

    nuevoEmpleado(empleado): Observable<any> {
        let param = JSON.stringify(empleado);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url + '/empleado', param, { headers: headers });
    }

    editarEmpleado(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url + '/empleado', { headers: headers });
    }

    buscarEmpleado(empleadoDni): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.get(this.url + '/empleado/' + empleadoDni, { headers: headers });
    }

    borrarEmpleado(idEmpleado): Observable<any> {
        console.log(idEmpleado);
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(this.url + '/empleado/' + idEmpleado, { headers: headers });
    }

    actualizarEmpleado(id, empleado): Observable<any> {
        let params = JSON.stringify(empleado)
        let headers = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.put(this.url + '/empleado/' + id, params, { headers: headers });
    }
}
