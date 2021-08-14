import { Component, OnInit} from '@angular/core';

import {FormControl,Validators, FormGroup} from '@angular/forms'

import {ComprarService} from '../../comprar.service'
import { Router , ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-direccion',
  templateUrl: './direccion.component.html',
  styleUrls: ['./direccion.component.css']
})
export class DireccionComponent implements OnInit {

  envio= 0;
  user_id : string | undefined;
    direccion = new FormGroup({
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
      estado : new FormControl('',
        [Validators.required])
      });

  estados = [
    "Distrito Federal",
    "Aguascalientes",
    "Baja California",
    "Baja California Sur",
    "Campeche",
    "Chiapas",
    "Chihuahua",
    "Coahuila",
    "Colima",
    "Durango",
    "Guanajuato",
    "Guerrero",
    "Hidalgo",
    "Jalisco",
    "Mexico",
    "Michoacan",
    "Morelos",
    "Nayarit",
    "Nuevo Leon",
    "Oaxaca",
    "Puebla",
    "Queretaro",
    "Quintana Roo",
    "San Luis Potosil;",
    "Sinaloa",
    "Sonora",
    "Tabasco",
    "Tamaulipas",
    "Tlaxcala",
    "Veracruz",
    "Yucatan",
    "Zacatecas"
  ]


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loc: Location,
    private comprarService: ComprarService
    ) {}

  ngOnInit(): void {
  }

  enviar_direccion(): void{
    const direc={
    "calle":this.direccion.controls["calle"].value,
    "numeroExt":this.direccion.controls["numext"].value, /* error con el nombre en la bases de datos*/
    "colonia": this.direccion.controls["colonia"].value,
    "ciudad": this.direccion.controls["ciudad"].value,
    "estado":this.direccion.controls["estado"].value
   };
    
    this.comprarService.ingresa_direccion(direc)
    .subscribe(
      dir =>{
        if(dir.category == "error"){
          this.envio = 2;
          console.log(dir.message)
        }
        if(dir.category == "success"){
          this.envio = 1;
          console.log(dir)
        }
      });
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.direccion.value);
  }

  valid(field: string): boolean {
    var x = this.direccion.get(field)
    if (x)
      return (x.valid && (x.dirty || x.touched));
    else
      return false;
  }

  invalid(field: string): boolean {
    var x = this.direccion.get(field)
    if (x)
      return (x.invalid && (x.dirty || x.touched));
    else
      return false;
  }

  goBack(): void {
    this.loc.back();
  }

  goPago(): void {
    this.router.navigateByUrl('pago');
  }
}
