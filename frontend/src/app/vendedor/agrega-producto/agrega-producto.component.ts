import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Producto } from '../../models/producto';
import { ProductoVendedorService } from '../producto-vendedor.service';

import { FormsValidatorService } from '../../forms-validator.service';

import { AuthCheckService } from '../../auth-check.service';

@Component({
  selector: 'app-agrega-producto',
  templateUrl: './agrega-producto.component.html',
  styleUrls: ['./agrega-producto.component.css']
})

export class AgregaProductoComponent implements OnInit {

  addedProd?: Producto;
  cats: string[] = [];
  imageUrl: any;
  file: File | null = null;
  
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
    precio: new FormControl('', [Validators.required]),
    categoria: new FormControl('', [Validators.required]),
    imagen: new FormControl('', [
      Validators.required
    ])
  });

  constructor(
    private router: Router,
    private auth: AuthCheckService,
    private prodService: ProductoVendedorService,
    private formService: FormsValidatorService
  ) { }

  ngOnInit(): void {
    /* Si no es vendedor, regresamos al inicio*/
    if (!this.auth.isLoggedVendedor()){
      this.router.navigateByUrl('/');
      return;
    }
    this.prodService.getCats().subscribe(
      (cs) => {this.cats =cs;},
      (_error) => {this.router.navigateByUrl('mensaje/error');}
      );
  }

  add(name: string, descripcion: string, disponible: string, 
      precio: string, cat: string): void {
    
    
    name = name.trim();
    cat = cat.split(':')[1].trim();
    
    var disp = Number(disponible);
    var prec = Number(precio);
    
    var nuevoProducto = {
      id_producto: -1,
      nombre: name, 
      descripcion: descripcion, 
      disponible: disp, 
      precio: prec, 
      categoria: cat, 
      imagen: '', 
      id_vendedor: 1
    } 
    
    if(this.file) {
      this.prodService.agregaProducto(nuevoProducto as Producto, this.file)
        .subscribe(
        (prod) => {
          this.addedProd = prod;
          this.router.navigateByUrl('mensaje/agregar');
        }, 
        (_error) => {
          this.router.navigateByUrl('mensaje/error'); 
        });
    } else {
      this.router.navigateByUrl('mensaje/error');
    }
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

  onFileChanged(event: any) {
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.imageUrl = '';
      this.productForm.controls['imagen'].setValue(null);
      this.productForm.controls['imagen'].markAsDirty();
      this.productForm.controls['imagen'].markAsTouched();
      return;
    }  
    const file= event.target.files[0]
    
    var mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      this.imageUrl = '';
      this.productForm.controls['imagen'].setValue(null);
      this.productForm.controls['imagen'].markAsDirty();
      this.productForm.controls['imagen'].markAsTouched();
      return;
    }

    this.file = file;
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (_event) => this.imageUrl = reader.result;
  }

  @HostListener('change', ['$event.target.files']) emitFiles (_event: FileList) { }

}
