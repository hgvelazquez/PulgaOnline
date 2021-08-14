import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Producto } from '../models/producto';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-detalles-producto',
  templateUrl: './detalles-producto.component.html',
  styleUrls: ['./detalles-producto.component.css']
})
export class DetallesProductoComponent implements OnInit {

  producto: Producto | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private prodService: ProductoService

  ) { }

  ngOnInit(): void {
    this.getProd();
  }

  getProd(): void {
    const id = Number(this.route.snapshot.paramMap.get('id_producto'));
    this.prodService.getProducto(id)
      .subscribe(
        (prod) => {this.producto = prod},
        (error) => {
          if (error.status === 404) {
            /* TODO: Replace with 404 page*/
            this.router.navigateByUrl('/mensaje/error');
          } else {
            this.router.navigateByUrl('/mensaje/error');
          }
        });
  }

 

  goBack(): void {
    this.router.navigateByUrl('/catalogo');
  }

}
