import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

import { Producto } from '../models/producto';

import {API_URL} from '../env';

import { CookieService } from 'ngx-cookie-service';

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


  constructor(
    private http: HttpClient,
    private cookies: CookieService
  ) { }

  getProductos(): Observable<Producto[]> {
    const usr = {
      'id_usuario': this.cookies.get('id_usuario'),
      'tipo_usuario': this.cookies.get('tipo_usuario')
    };
    return this.http.post<Producto[]>(this.productosUrl, usr, this.httpOptions)
      .pipe(
        catchError(this.handleError<Producto[]>('getProductos', []))
      );
  }

  getProducto(id: number): Observable<Producto> {
    const usr = {'id_usuario': this.cookies.get('id_usuario')};
    const url = `${this.productosUrl}/${id}`;
    return this.http.post<Producto>(url, usr, this.httpOptions);
  }

  agregaProducto(prod: Producto, img: File): Observable<Producto> {
    const usr = {'id_usuario': this.cookies.get('id_usuario')};
    const prdjson = JSON.stringify(prod);
    const upLoadData = new FormData();
    const blobOverrides = new Blob([JSON.stringify(prdjson)], {
      type: 'application/json',
    });
    const blobOverridesUsr = new Blob([JSON.stringify(usr)], {
      type: 'application/json',
    });
    upLoadData.append('usuario', blobOverridesUsr);
    upLoadData.append('producto', blobOverrides);
    upLoadData.append('imageUpload', img, img.name);
    return this.http.post<Producto>(this.agregaUrl, upLoadData);
  }

  eliminaProducto(idProd: number): Observable<Producto> {
    const usr = JSON.stringify({'id_usuario': this.cookies.get('id_usuario')});
    const usrHttpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: usr
    }
    
    const url = `${this.eliminaUrl}/${idProd}`;
    return this.http.delete<Producto>(url, usrHttpOptions);
  }

  actualizaProducto(prod: Producto, img: File | null): Observable<Producto> {
    const usr = {'id_usuario': this.cookies.get('id_usuario')};
    const prdjson = JSON.stringify(prod);
    const upLoadData = new FormData();
    const blobOverrides = new Blob([JSON.stringify(prdjson)], {
      type: 'application/json',
    });
    const blobOverridesUsr = new Blob([JSON.stringify(usr)], {
      type: 'application/json',
    });

    upLoadData.append('usuario', blobOverridesUsr);
    upLoadData.append('producto', blobOverrides);
    if (img)
      upLoadData.append('imageUpload', img, img.name);
    const url = `${this.actualizaUrl}/${prod.id_producto}`;
    return this.http.post<Producto>(url, upLoadData);
  }

  getCats(): Observable<string[]> {
    const usr = {'tipo_usuario': this.cookies.get('tipo_usuario')};
    return this.http.post<string[]>(API_URL+'/get-cats', usr);
  }


  private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    console.error(error); 
    return of(result as T);

    };
  }

}
