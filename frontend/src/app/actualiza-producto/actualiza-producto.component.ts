import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Producto } from '../models/producto';
import { ProductoVendedorService } from '../producto-vendedor.service';
import { FormsValidatorService } from '../forms-validator.service';

@Component({
  selector: 'app-actualiza-producto',
  templateUrl: './actualiza-producto.component.html',
  styleUrls: ['./actualiza-producto.component.css']
})
export class ActualizaProductoComponent implements OnInit {
  
  id : string = "-1";
  producto: Producto | undefined;

  productForm = new FormGroup({
    nombre: new FormControl(''),
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
    categoria: new FormControl('')
  });

  constructor(
    private aroute: ActivatedRoute,
    private location: Location,
    private prodService: ProductoVendedorService,
    private formService: FormsValidatorService
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
      .subscribe(prod => {
        this.producto = prod;
        this.productForm.setValue({
          nombre: prod.nombre,
          descripcion: prod.descripcion,
          disponible: prod.disponible,
          precio: prod.precio,
          categoria: prod.categoria 
        });
        this.productForm.controls['nombre'].disable();
        this.productForm.controls['categoria'].disable();
      });
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

  logSubmitted() {
    console.log("Form Submitted");
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