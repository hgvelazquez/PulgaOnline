import { Injectable } from '@angular/core';

/** Importacion para recibir del back */
import { Observable, throwError} from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

/* Importación para las cookies */
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ComprarService {

  private BASE_URL = 'http://localhost:5000/comprar'

  constructor(
    private http: HttpClient,
    private cookies: CookieService
  ) {}

  ingresa_direccion(Observable:any){
    const url = `${this.BASE_URL}/ingresa_direccion`;
    return this.http.post<any>(url,Observable).pipe(
      catchError(this.handleError)
    )
  }

  validar_compra():Observable<any>{
    const id_prod = Number(this.cookies.get('id_producto'));
    const id_usr = Number(this.cookies.get('id_usuario'));
    const prod = {
      'id_producto': id_prod,
      'id_usuario': id_usr
    };
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const url = `${this.BASE_URL}/validar_compra`;
    return this.http.post<any>(url, prod, httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  
  private handleError(error =HttpErrorResponse) {
    console.log(error);
    return throwError("algo salio mal")
  }
  
  enviar_correo():Observable<any>{
    const id_prod = Number(this.cookies.get('id_producto'));
    const correo = Number(this.cookies.get('correo'));
    const prod = {
      'id_producto': id_prod,
      'correo': correo
    };
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<any>('http://localhost:5000/send', prod, httpOptions).pipe(
      catchError(this.handleError)
    )
  }

} 
