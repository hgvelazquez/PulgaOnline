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

  agregaProducto(prod: Producto, img: File): Observable<Producto> {
    const prdjson = JSON.stringify(prod);
    const upLoadData = new FormData();
    const blobOverrides = new Blob([JSON.stringify(prdjson)], {
      type: 'application/json',
    });
    upLoadData.append('producto', blobOverrides);
    upLoadData.append('imageUpload', img, img.name);
    return this.http.post<Producto>(this.agregaUrl, upLoadData);
  }

  eliminaProducto(idProd: number): Observable<Producto> {
    const url = `${this.eliminaUrl}/${idProd}`;
    return this.http.delete<Producto>(url, this.httpOptions);
  }

  actualizaProducto(prod: Producto, img: File | null): Observable<Producto> {
    const prdjson = JSON.stringify(prod);
    const upLoadData = new FormData();
    const blobOverrides = new Blob([JSON.stringify(prdjson)], {
      type: 'application/json',
    });
    upLoadData.append('producto', blobOverrides);
    if (img)
      upLoadData.append('imageUpload', img, img.name);
    const url = `${this.actualizaUrl}/${prod.id_producto}`;
    return this.http.post<Producto>(url, upLoadData);
  }

  getCats(): Observable<string[]> {
    return this.http.get<string[]>(API_URL+'/get-cats');
  }


  private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    console.error(error); 
    return of(result as T);

    };
  }

}
