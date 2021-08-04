import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Producto } from '../models/producto';
import { ProductoVendedorService } from '../producto-vendedor.service';

@Component({
  selector: 'app-actualiza-producto',
  templateUrl: './actualiza-producto.component.html',
  styleUrls: ['./actualiza-producto.component.css']
})
export class ActualizaProductoComponent implements OnInit {
  
  id : string = "-1";
  producto: Producto | undefined;

  constructor(
    private aroute: ActivatedRoute,
    private location: Location,
    private prodService: ProductoVendedorService,
  ) { }

  ngOnInit(): void {
    const id = this.aroute.snapshot.paramMap.get('id_producto')
    if (id)
      this.id = id;
    this.getProd();
  }

  getProd(): void {
    const id = Number(this.id);
    this.prodService.getProducto(id)
      .subscribe(prod => this.producto = prod);
  }

  update(desc: string, precio: string, dispo: string) {
    console.log("Beign");
    var disp = Number(dispo);
    var prec = Number(precio);
    var idi = Number(this.id);
    var nuevoProducto = {
      id_producto: idi,
      nombre: 'dummy', 
      descripcion: desc, 
      disponible: disp, 
      precio: prec, 
      categoria: 'dummy', 
      imagen: 'mock/path/to/image.png', 
      id_vendedor: 1
    } 
    
    console.log("Producto listo para intentar");
    this.prodService.actualizaProducto(nuevoProducto as Producto)
    .subscribe(
      _ => { 
        this.goBack();
      } 
    );
  }

  goBack(): void {
    this.location.back();
  }

}