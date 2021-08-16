import { Component, OnInit, Input} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Producto } from '../../models/producto';
import { ProductoVendedorService } from '../producto-vendedor.service';

import { AuthCheckService } from '../../auth-check.service';

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
    private auth: AuthCheckService,
    private prodService: ProductoVendedorService,
  ) { }

  ngOnInit(): void {
    /* Si no es vendedor, regresamos al inicio*/
    if (!this.auth.isLoggedVendedor()){
      this.router.navigateByUrl('/');
      return;
    }
    this.getProd();
  }

  getProd(): void {
    const id = Number(this.route.snapshot.paramMap.get('id_producto'));
    this.prodService.getProducto(id)
      .subscribe(
        (prod) => {this.producto = prod},
        (error) => {
          if (error.status == 403) {
            /* No queremos que sepa que el producto existe y no es de él*/
            this.router.navigateByUrl('/404-not-found');
          } else {
            this.router.navigateByUrl('/mensaje/error');
          }
        });
  }

 

  goBack(): void {
    this.router.navigateByUrl('/mis-productos');
  }

  navigate(url: string): void {
    if (this.producto)
      this.router.navigateByUrl(`/${url}/${this.producto.id_producto}`);
    else
      this.router.navigateByUrl(`/mensaje/error`); 
  }
}
