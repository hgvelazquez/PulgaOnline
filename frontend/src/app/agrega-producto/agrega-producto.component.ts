import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Producto } from '../models/producto';
import { ProductoVendedorService } from '../producto-vendedor.service';

import { FormsValidatorService } from '../forms-validator.service';


@Component({
  selector: 'app-agrega-producto',
  templateUrl: './agrega-producto.component.html',
  styleUrls: ['./agrega-producto.component.css']
})

export class AgregaProductoComponent implements OnInit {

  addedProd?: Producto;
  
  productForm = new FormGroup({
    nombre: new FormControl('', [
      Validators.required, 
      this.formService.validateNonEmptyString()
    ]),
    descripcion: new FormControl('', [
      Validators.required, 
      this.formService.validateNonEmptyString()
    ]),
    disponible: new FormControl('', [
      Validators.required, 
      this.formService.validateIntegerString()
    ]),
    precio: new FormControl('', [
      Validators.required,
      //this.formService.validateNumberString(),
    ]),
    categoria: new FormControl('', [Validators.required])
  });

  constructor(
    private router: Router,
    private prodService: ProductoVendedorService,
    private formService: FormsValidatorService
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
        this.router.navigateByUrl('mensaje/agregar/si');
      });
    
    
  }

  logSubmitted() {
    console.log("Form Submitted");
  }

  goBack(): void {
    this.router.navigateByUrl('mis-productos');
  }

  valid(field: string): boolean {
    var x = this.productForm.get(field)
    if (x)
      return (x.valid && (x.dirty || x.touched));
    else
      return false;
  }

  invalid(field: string): boolean {
    var x = this.productForm.get(field)
    if (x)
      return (x.invalid && (x.dirty || x.touched));
    else
      return false;
  }

}
