import { Component, OnInit, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';

import { Producto } from '../../models/producto';
import { ProductoVendedorService } from '../producto-vendedor.service';
import { FormsValidatorService } from '../../forms-validator.service';

import { AuthCheckService } from '../../auth-check.service';

@Component({
  selector: 'app-actualiza-producto',
  templateUrl: './actualiza-producto.component.html',
  styleUrls: ['./actualiza-producto.component.css']
})
export class ActualizaProductoComponent implements OnInit {
  
  id : string = "-1";
  producto: Producto | undefined;
  imageUrl: any;
  file: File | null = null;

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
    ]),
    categoria: new FormControl(''),
    imagen: new FormControl('mockvalid', [
      Validators.required,
    ])
  });

  constructor(
    private aroute: ActivatedRoute,
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
    const id = this.aroute.snapshot.paramMap.get('id_producto')
    if (id)
      this.id = id;
    this.getProd();
  }

  getProd(): void {
    const id = Number(this.id);
    this.prodService.getProducto(id).subscribe(
      prod => {
        this.producto = prod;
        this.productForm.setValue({
          nombre: prod.nombre,
          descripcion: prod.descripcion,
          disponible: prod.disponible,
          precio: prod.precio,
          categoria: prod.categoria,
          imagen: 'mockvalid'
        });
        this.productForm.controls['nombre'].disable();
        this.productForm.controls['categoria'].disable();
        this.imageUrl = 'http://localhost:5000/static/' + this.producto.imagen;
      }, 
      error => {
        if (error.status == 403) {
          this.router.navigateByUrl('/acceso-denegado');
        } else { 
        this.router.navigateByUrl('/mensaje/error');
        }
      }
    );
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
      imagen: (this.producto) ? this.producto.imagen : '', 
      id_vendedor: 1
    } 
    
    this.prodService.actualizaProducto(nuevoProducto as Producto, this.file)
    .subscribe(
      _ => { 
        this.goBack(true);
      },
      _error => {
        this.router.navigateByUrl('/mensaje/error');
      }
    );
  }

  goBack(reload: boolean): void {
    const url = (this.producto) ? `/detail/${this.producto.id_producto}` : '/mis-productos';
    if (reload) {
      this.router.navigateByUrl(url).then(() => {
        window.location.reload();
      });
    } else {
      this.router.navigateByUrl(url);
    }
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

  invalidFile(): boolean {
    var x = this.productForm.get('imagen');
    return (x)? (this.file===null && (x.dirty || x.touched)): false;
  }

  onFileChanged(event: any) {
    const im = (this.producto) ? this.producto.imagen : '';
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.imageUrl = '';
      this.productForm.controls['imagen'].markAsTouched();
      return;
    }  
    const file= event.target.files[0]
    
    var mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      this.imageUrl = '';
      this.productForm.controls['imagen'].markAsTouched();
      return;
    }

    this.file = file;
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (_event) => {
      this.imageUrl = reader.result;
      this.productForm.controls['imagen'].setValue('mockvalid');
    }
  }

  @HostListener('change', ['$event.target.files']) emitFiles (_event: FileList) { }

}