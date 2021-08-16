import { Component, OnInit } from '@angular/core';
import {FormControl,Validators, FormGroup} from '@angular/forms' /**sirve para controlar los formularios, add in app.module.ts */

import { ComprarService } from '../comprar.service'
import { Router } from '@angular/router';

import { FormsValidatorService } from '../../../forms-validator.service';
import { AuthCheckService } from '../../../auth-check.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  validar = 0;
  private date = new Date();
  today = "";
  mensaje=""; 
  
  pago = new FormGroup({
    numero_tarjeta : new FormControl('',[
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(15),
      Validators.maxLength(16)
    ]),
    codigo : new FormControl('',[
      Validators.required,
      Validators.pattern("^[0-9]*$"),
      Validators.minLength(3),
      Validators.maxLength(3)
    ]),
    nombre_titular : new FormControl('',[
      Validators.required,
      this.formService.validateLengthString(4, 30)
    ]),
    fecha: new FormControl('', [
      Validators.required,
      this.formService.validateLaterDate()
    ])
  });

  constructor(
    private router: Router,
    private comprarService: ComprarService,
    private formService: FormsValidatorService,
    private authCheck: AuthCheckService,
  ) { }

  ngOnInit(): void {
    if (! this.authCheck.isLoggedComprador()){
      this.router.navigateByUrl('/');
      return;
    }  
    var month = this.date.getMonth()+1
    var monthDisp = (month < 10) ? `0${month}` : month.toString();
    this.today = this.date.getFullYear() + '-' + monthDisp  + '-' + this.date.getDate();
    this.pago.controls['fecha'].setValue(this.today);
  }
  
  goBack(): void {
    this.router.navigateByUrl('direccion');
  }
  
  goBegin(): void {
    if(this.validar == 1){
      this.enviar_correo() 
    }
    this.router.navigateByUrl('catalogo');
  }
  
  validad_compra():void{    
    this.comprarService.validar_compra()
    .subscribe(
      compra =>{
        this.validar = 1;
        console.log(compra);
      },
      err => {
        this.validar = 2;
        if (err.status == 400)
          this.mensaje = "¡Oh no! Ya no hay productos disponibles.";
        else
          this.mensaje = "¡Oh no! Ocurrió un error en la compra.\n Inténtelo más tarde."
      });
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
