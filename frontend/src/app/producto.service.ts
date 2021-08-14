import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Producto } from './models/producto';

import {API_URL} from './env';

import {MensajeService} from './mensaje.service';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private productosUrl = API_URL + '/productos';

  constructor(private http: HttpClient,
              private mensajeService: MensajeService) { }


  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.productosUrl).pipe(
      catchError(this.handleError<Producto[]>('getProductos', []))
    );
  }


  getProducto(id: number): Observable<Producto> {
    const url = `${this.productosUrl}/${id}`;
    return this.http.get<Producto>(url);
  }


  buscaProductos(term: string): Observable<Producto[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Producto[]>(`${this.productosUrl}/search/${term}`).pipe(
      catchError(this.handleError<Producto[]>('buscaProductos', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error); 
       this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
  
      };
    }

  private log(mensaje: string) {
    this.mensajeService.add(`ProductoService: ${mensaje}`);
  }


    /** GET hero by id_producto. Return `undefined` when id_producto not found 
  getProductoNo404<Data>(id_producto: number): Observable<Producto> {
    const url = `${this.productosUrl}/?id_producto=${id_producto}`;
    return this.http.get<Producto[]>(url)
      .pipe(
        map(productos => productos[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} producto id_producto=${id_producto}`);
        }),
        catchError(this.handleError<Producto>(`getProducto id_producto=${id_producto}`))
      );
  }**/
}




