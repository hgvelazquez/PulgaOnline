import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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
    private route: ActivatedRoute,
    private prodService: ProductoVendedorService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getProd();
  }

  getProd(): void {
    const id = Number(this.route.snapshot.paramMap.get('id_producto'));
    this.prodService.getProducto(id)
      .subscribe(prod => this.producto = prod);
  }
}
