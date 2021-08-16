import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Producto } from '../../models/producto';
import { ProductoVendedorService } from '../producto-vendedor.service';

import { AuthCheckService } from '../../auth-check.service';

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
    private auth: AuthCheckService,
  ) { }

  ngOnInit(): void {
    /* Si no es vendedor, regresamos al inicio*/
    if (!this.auth.isLoggedVendedor()){
      this.router.navigateByUrl('/');
      return;
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
