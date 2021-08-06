import { Component, OnInit, Input} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Producto } from '../models/producto';
import { ProductoVendedorService } from '../producto-vendedor.service';

@Component({
  selector: 'app-detalles-producto-vendedor',
  templateUrl: './detalles-producto-vendedor.component.html',
  styleUrls: ['./detalles-producto-vendedor.component.css']
})
export class DetallesProductoVendedorComponent implements OnInit {

  producto: Producto | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private prodService: ProductoVendedorService,
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

  navigate(place: string): void {
    const url = 
      (this.producto)? 
      `/${place}-producto/${this.producto.id_producto}`:
      '/mensaje/error';
    this.router.navigateByUrl(url);
  }

  goBack(): void {
    this.router.navigateByUrl('/mis-productos');
  }
}
