import { Component, OnInit } from '@angular/core';

import { Producto } from '../models/producto';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: Producto[] = [];

  constructor(
    private prodService: ProductoService
  ) { }

  ngOnInit(): void {
    this.getProductos();
  }

    
  getProductos(): void {
    this.prodService.getProductos()
      .subscribe(prods => this.productos = prods);
  }

}
