import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { CookieService } from 'ngx-cookie-service';

import { Producto } from '../models/producto';

import {API_URL} from '../env';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private productosUrl = API_URL + '/productos';

  constructor(
    private http: HttpClient,
    private cookies: CookieService
  ) { }


  getProductos(): Observable<Producto[]> {
    const usr = {'id_usuario': this.cookies.get('id_usuario')};
    return this.http.post<Producto[]>(this.productosUrl, usr).pipe(
      catchError(this.handleError<Producto[]>('getProductos', []))
    );
  }


  getProducto(id: number): Observable<Producto> {
    const usr = {'id_usuario': this.cookies.get('id_usuario')};
    const url = `${this.productosUrl}/${id}`;
    return this.http.post<Producto>(url, usr);
  }


  buscaProductos(term: string): Observable<Producto[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Producto[]>(`${this.productosUrl}/search/${term}`).pipe(
      catchError(this.handleError<Producto[]>('buscaProductos', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error); 
      return of(result as T);
  
      };
    }
}




