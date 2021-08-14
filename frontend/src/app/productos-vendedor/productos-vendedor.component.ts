import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Producto } from '../models/producto';
import { ProductoVendedorService } from '../producto-vendedor.service';

@Component({
  selector: 'app-productos-vendedor',
  templateUrl: './productos-vendedor.component.html',
  styleUrls: ['./productos-vendedor.component.css']
})

export class ProductosVendedorComponent implements OnInit {

  productos: Producto[] = [];

  constructor(
    private prodService: ProductoVendedorService,
    private router: Router
  ) { }

  ngOnInit(): void {
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
