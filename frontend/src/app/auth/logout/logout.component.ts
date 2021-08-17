import { Component, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private cookies: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout(): void{
    this.cookies.deleteAll('');
    this.cookies.deleteAll('login');
    this.cookies.deleteAll('signup');
    this.cookies.deleteAll('mis-productos');
    this.cookies.deleteAll('agregar-producto');
    this.cookies.deleteAll('pago');
    this.cookies.deleteAll('direccion');
    this.cookies.deleteAll('catalogo');
    this.cookies.deleteAll('error');
    this.cookies.deleteAll('acceso-denegado');
    this.cookies.deleteAll('/');
    console.log("Logging Out");
    this.router.navigateByUrl('/');
  }

}
