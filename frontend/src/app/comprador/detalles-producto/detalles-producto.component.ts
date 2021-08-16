import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
/* Para la memoria del producto*/
import { CookieService } from 'ngx-cookie-service';

import { Producto } from '../../models/producto';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-detalles-producto',
  templateUrl: './detalles-producto.component.html',
  styleUrls: ['./detalles-producto.component.css']
})
export class DetallesProductoComponent implements OnInit {

  id: number =-1;
  producto: Producto | undefined;
  disponible = -1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private prodService: ProductoService,
    private cookies: CookieService
  ) { }

  ngOnInit(): void {
    this.getProd();
  }

  getProd(): void {
    const id_url = Number(this.route.snapshot.paramMap.get('id_producto'));
    if (!id_url)
      this.router.navigateByUrl('/error');
    
    this.id = id_url;  
    this.prodService.getProducto(this.id)
      .subscribe(
        (prod) => {
          this.producto = prod;
          this.disponible = prod.disponible;
          this.cookies.set('id_producto', prod.id_producto.toString(), 1);
        },
        (error) => {
          console.log(error);
          if (error.status === 404) {
            /* TODO: Replace with 404 page*/
            this.router.navigateByUrl('/error');
          } else {
            this.router.navigateByUrl('/error');
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
    this.router.navigateByUrl('/catalogo');
  }

  direccion(): void {
    this.router.navigateByUrl('/direccion');
  }

}
