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

  validar = 2;  
  myGroup = new FormGroup({ /* con my group resolvi el error formgroup */
    direccion : new FormGroup({
      numero_tarjeta : new FormControl('',[
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(15),
        Validators.maxLength(17)]),
      codigo : new FormControl('',[
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(3),
        Validators.maxLength(3)]),
      nombre_titular : new FormControl('',[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)]),
      fecha : new FormControl('',[
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(5)])
      })
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private comprarService: ComprarService) { }

  ngOnInit(): void {
  }


  validad_compra():void{
    const d = this.myGroup.controls["direccion"].value
    const direc={
    "numero_tarjeta":d["numero_tarjeta"],
    "codigo":d["codigo"], 
    "nombre_titular": d["nombre_titular"],
    "fecha": d["fecha"]
   };
    
    this.comprarService.validar_compra()
    .subscribe(
      compra =>{
        if(compra.category == "error"){
          this.validar = 0;
          console.log(compra.message)
        }
        if(compra.category == "success"){
          this.validar = 1;
          console.log(compra)
        }
      });
  }
}
