import { Injectable } from '@angular/core';
import { Observable ,of, throwError} from 'rxjs';
import {  HttpClient, HttpHeaders,HttpErrorResponse  } from '@angular/common/http';
import { retry, catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private BASE_URL = 'http://localhost:5000/auth'
 
  constructor( private http: HttpClient) { }


  ingresa_datos(Observable:any){
    const url = `${this.BASE_URL}/signin`;
    return this.http.post<any>(url,Observable)
} 

login(Observable:any){
  const url = `${this.BASE_URL}/login`;
  return this.http.post<any>(url,Observable)
} 








}
