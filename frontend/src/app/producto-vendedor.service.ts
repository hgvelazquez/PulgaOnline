import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Producto } from './models/producto';

import {API_URL} from './env';

@Injectable({
  providedIn: 'root'
})

export class ProductoVendedorService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private productosUrl = API_URL + '/productos-vendedor';
  private agregaUrl = API_URL + '/agregar-producto';
  private eliminaUrl = API_URL + '/eliminar-producto';
  private actualizaUrl = API_URL + '/actualizar-producto';


  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.productosUrl).pipe(
      catchError(this.handleError<Producto[]>('getProductos', []))
    );
  }

  getProducto(id: number): Observable<Producto> {
    const url = `${this.productosUrl}/${id}`;
    return this.http.get<Producto>(url);
  }

  agregaProducto(prod: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.agregaUrl, prod, this.httpOptions).pipe(
        catchError(this.handleError<Producto>('agregaProducto'))
    );
  }

  eliminaProducto(idProd: number): Observable<Producto> {
    const url = `${this.eliminaUrl}/${idProd}`;
    return this.http.delete<Producto>(url, this.httpOptions).pipe(
      catchError(this.handleError<Producto>('eliminaProducto'))
    );
  }

  actualizaProducto(prod: Producto): Observable<Producto> {
    const url = `${this.actualizaUrl}/${prod.id_producto}`;
    console.log("Ok");
    return this.http.post<Producto>(url, prod, this.httpOptions).pipe(
      catchError(this.handleError<Producto>('actualizaProducto'))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    console.error(error); 
    return of(result as T);

    };
  }

}
