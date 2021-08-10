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
  //myGroup = new FormGroup({ /* con my group resolvi el error formgroup */
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
      estado : new FormControl('',[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20)])
      });
  //})

  


  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
    .subscribe(direc =>{
      this.envio = true;
      console.log(direc)},
      err => {
        this.envio = false;
        console.log(err);
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
    this.router.navigateByUrl('/');
  }
  goPago(): void {
    this.router.navigateByUrl('pago');
  }
}
