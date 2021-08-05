import { Component, OnInit , Input} from '@angular/core';

import {FormControl,Validators, FormGroup} from '@angular/forms' /**sirve para controlar los formularios, add in app.module.ts */

import {ComprarService} from '../comprar.service'
import { Router , ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.css']
})
export class DireccionComponent implements OnInit {

  envio= false;
  user_id : string | undefined;
  myGroup = new FormGroup({ /* con my group resolvi el error formgroup */
    direccion : new FormGroup({
      calle : new FormControl('',[
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(15)]),
      numext : new FormControl('',[
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(1),
        Validators.maxLength(5)]),
      colonia : new FormControl('',[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(25)]),
      ciudad : new FormControl('',[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)]),
      estado : new FormControl('',[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)])
      })
  });

  


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private comprarService: ComprarService
    ) {}

  ngOnInit(): void {
  }
  enviar_direccion(): void{
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
      this.envio = true;
      console.log(direc)},
      err => {
        this.envio = false;
        console.log(err);
        });
  }
}
