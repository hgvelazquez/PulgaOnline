import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required]),
    disponible: new FormControl('', [Validators.required]),
    precio: new FormControl('', [Validators.required]),
    categoria: new FormControl('', [Validators.required])
  });

  constructor(
    private router: Router,
    private prodService: ProductoVendedorService,
    private formService: FormsValidatorService
  ) { }

  ngOnInit(): void {
  }

  validate(name: string, descripcion: string, disponible: string, 
    precio: string, cat: string): void {
    
    name = name.trim();
    descripcion = descripcion.trim();
    disponible = disponible.trim();
    precio = precio.trim();
    cat = cat.trim();
    
    var allValid = true;

    if (!this.formService.validateNonEmptyString(name)){
      allValid = false;
    }
    if (!this.formService.validateNonEmptyString(descripcion)) {
      allValid = false;
    } 
    if (!this.formService.validateIntegerString(disponible)) {
      allValid = false;
    }
    if (!this.formService.validateNumberString(precio)) {
      allValid = false;
    }
    if (allValid) {
      this.add(name, descripcion, disponible, precio, cat);
    } else {
      console.log("Incorrect form");
    }

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

}
