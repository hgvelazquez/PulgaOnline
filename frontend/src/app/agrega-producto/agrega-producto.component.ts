import { Component, OnInit } from '@angular/core';

import { Producto } from '../models/producto';
import { ProductoVendedorService } from '../producto-vendedor.service';
import {API_URL} from '../env';


@Component({
  selector: 'app-agrega-producto',
  templateUrl: './agrega-producto.component.html',
  styleUrls: ['./agrega-producto.component.css']
})

export class AgregaProductoComponent implements OnInit {

  addedProd?: Producto;

  constructor(
    private prodService: ProductoVendedorService
  ) { }

  ngOnInit(): void {
  }

  add(name: string, descripcion: string, disponible: string, 
      precio: string, cat: string): void {
    
    name = name.trim();
    if (!name) { return; }
    var disp = Number(disponible);
    var prec = Number(precio);
    var nuevoProducto = {
      id_producto: -1,
      nombre: name, 
      descripcion: descripcion, 
      disponible: disp, 
      precio: prec, 
      categoria: cat, 
      imagen: 'mock/path/to/image.png', 
      id_vendedor: 1
    } 
    
    this.prodService.agregaProducto(nuevoProducto as Producto)
      .subscribe(prod => {
        this.addedProd = prod;
      });
  }

}
