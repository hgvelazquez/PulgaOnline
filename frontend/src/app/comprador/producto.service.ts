import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

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
    private http: HttpClient
  ) { }


  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.productosUrl).pipe(
      catchError(this.handleError<Producto[]>('getProductos', []))
    );
  }

  getProductoNo404<Data>(id_producto: number): Observable<Producto> {
    const url = `${this.productosUrl}/?id_producto=${id_producto}`;
    return this.http.get<Producto[]>(url)
      .pipe(
        map(productos => productos[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
        }),
        catchError(this.handleError<Producto>(`getProducto id_producto=${id_producto}`))
      );
  }



  getProducto(id: number): Observable<Producto> {
    const url = `${this.productosUrl}/${id}`;
    return this.http.get<Producto>(url);
  }


  buscaProductos(term: string): Observable<Producto[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Producto[]>(`${this.productosUrl}/?nombre=${term}`).pipe(
      tap(x => x.length ?
         console.log(`Se encontraron productos que coinciden con "${term}"`) :
         console.log(`No hay productos que coincidan con "${term}"`)),
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
