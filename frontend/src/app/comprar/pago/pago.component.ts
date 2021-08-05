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


  validad_compra(): void{
    const d = this.myGroup.controls["direccion"].value
    const direc={
    "calle":d["calle"],
    "numeroExt":d["numext"], /* error con el nombre en la bases de datos*/
    "colonia": d["colonia"],
    "ciudad": d["ciudad"],
    "estado":d["estado"]
   };
    
    this.comprarService.ingresa_direccion(direc)
    .subscribe(direc =>{
      console.log(direc)},
      err => {
        console.log(err);
        });
  }
}
