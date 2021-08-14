import { Component, OnInit } from '@angular/core';
import {FormControl,Validators, FormGroup} from '@angular/forms' /**sirve para controlar los formularios, add in app.module.ts */

import {ComprarService} from '../comprar.service'
import { Router , ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  validar = 0;  
  //myGroup = new FormGroup({ /* con my group resolvi el error formgroup */
    pago = new FormGroup({
      numero_tarjeta : new FormControl('',[
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(15),
        Validators.maxLength(16)]),
      codigo : new FormControl('',[
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(3),
        Validators.maxLength(3)]),
      nombre_titular : new FormControl('',[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)])
      });
  // });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private comprarService: ComprarService) { }

  ngOnInit(): void {
  }
  goBack(): void {
    this.router.navigateByUrl('direccion');
  }
  goBegin(): void {
    if(this.validar == 1){//evia correo si la compra fue exitosa
      this.enviar_correo() 
    }
    this.router.navigateByUrl('');
  }
  validad_compra():void{    
    this.comprarService.validar_compra()
    .subscribe(
      compra =>{
        if(compra.category == "error"){
          this.validar = 2;
          console.log(compra.message)
        }
        if(compra.category == "success"){
          this.validar = 1;
          console.log(compra)
        }
      });
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.pago.value);
  }
  valid(field: string): boolean {
    var x = this.pago.get(field)
    if (x)
      return (x.valid && (x.dirty || x.touched));
    else
      return false;
  }

  invalid(field: string): boolean {
    var x = this.pago.get(field)
    if (x)
      return (x.invalid && (x.dirty || x.touched));
    else
      return false;
  }

  /** envia correo de compra exitosa */
  enviar_correo():void{
    this.comprarService.enviar_correo().subscribe(
      exito=>{console.log(exito)},
      err => {console.error(err)}
    );
  }
}
