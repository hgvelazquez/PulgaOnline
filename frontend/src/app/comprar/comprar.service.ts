import { Injectable } from '@angular/core';

/** Importacion para recibir del back */
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ComprarService {

  private BASE_URL = 'http://localhost:4000/comprar'
  constructor(private http: HttpClient) {}
}
