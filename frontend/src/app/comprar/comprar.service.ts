import { Injectable } from '@angular/core';

/** Importacion para recibir del back */
import { Observable ,of, throwError} from 'rxjs';
import {  HttpClient, HttpHeaders,HttpErrorResponse  } from '@angular/common/http';
import { retry, catchError, map, tap } from 'rxjs/operators';

import {Producto} from '../producto';
@Injectable({
  providedIn: 'root'
})
export class ComprarService {

  private BASE_URL = 'http://localhost:5000/comprar'

  constructor(
    private http: HttpClient
      ) {}

  getProducto(id: string): Observable<any> {
      const url = `${this.BASE_URL}/${id}`;
      return this.http.get<any>(url);
  }

  existe(id:string):Observable<any>{
    const url = `${this.BASE_URL}/existe_producto-${id}`;
    return this.http.get<any>(url);
  }

  ingresa_direccion(Observable:any){
    const url = `${this.BASE_URL}/ingresa_direccion`;
    return this.http.post<any>(url,Observable).pipe(
      catchError(this.handleError)
    )
  }

  validar_compra():Observable<any>{
    const url = `${this.BASE_URL}/validar_compra`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError)
    )
  }


  private handleError(error =HttpErrorResponse) {
    console.log(error);
    return throwError("algo salio mal")
  }
} 
