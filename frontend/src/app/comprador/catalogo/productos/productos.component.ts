import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Producto } from '../../../models/producto';
import { ProductoService } from '../../producto.service';
import { AuthCheckService } from '../../../auth-check.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: Producto[] = [];

  constructor(
    private router: Router,
    private prodService: ProductoService,
    private authCheck: AuthCheckService,
  ) { }

  ngOnInit(): void {
    if (! this.authCheck.isLoggedComprador()){
      this.router.navigateByUrl('/');
      return;
    }
    this.getProductos();
  }

    
  getProductos(): void {
    this.prodService.getProductos()
      .subscribe(prods => this.productos = prods);
  }

}
