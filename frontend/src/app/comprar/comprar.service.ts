import { Injectable } from '@angular/core';

/** Importacion para recibir del back */
import { Observable } from 'rxjs';
import {  HttpClient, HttpHeaders  } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

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




}
