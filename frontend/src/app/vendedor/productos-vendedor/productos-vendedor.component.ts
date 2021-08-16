import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Producto } from '../../models/producto';
import { ProductoVendedorService } from '../producto-vendedor.service';

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-productos-vendedor',
  templateUrl: './productos-vendedor.component.html',
  styleUrls: ['./productos-vendedor.component.css']
})

export class ProductosVendedorComponent implements OnInit {

  productos: Producto[] = [];

  constructor(
    private prodService: ProductoVendedorService,
    private router: Router,
    private cookies: CookieService,
  ) { }

  ngOnInit(): void {
    const logged = this.cookies.check('loggedIn');
    if (! logged) {
      this.router.navigateByUrl('/');
    }
    this.getProductos();
  }
  
  getProductos(): void {
    this.prodService.getProductos()
      .subscribe(prods => this.productos = prods);
  }

  goAgregar() {
    this.router.navigateByUrl('/agregar-producto');
  }
}
