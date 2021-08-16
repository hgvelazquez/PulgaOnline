import { Component, OnInit } from '@angular/core';

import  {AuthService} from '../auth.service'
import { Router } from '@angular/router';
import {FormControl,Validators, FormGroup} from '@angular/forms'

import { FormsValidatorService } from '../../forms-validator.service';
import { AuthCheckService } from '../../auth-check.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  tipos = ["vendedor", "comprador" ]
  redirect = 0
  mensaje = ""
  
  user = new FormGroup({
    nombre : new FormControl('',[
      Validators.required,
      this.formService.validateLengthString(4, 15),
    ]),
    correo : new FormControl('',[
      Validators.required,
      Validators.email,
      this.formService.validateLengthString(6, 30),
    ]),
    contrasena : new FormControl('',[
      Validators.required,
      this.formService.validateLengthString(6, 20)
    ]),
    confirmar: new FormControl( '', [Validators.required]),
    tipo_usuario : new FormControl('',[Validators.required])
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private authCheck: AuthCheckService,
    private formService: FormsValidatorService
  ) { }

  ngOnInit(): void {
    this.authCheck.isNotLogged(this.router);
  }

  enviar_datos(): void{
    const us = {
      "nombre": this.user.controls["nombre"].value.trim(),
      "correo": this.user.controls["correo"].value.trim(),
      "contrasena": this.user.controls["contrasena"].value.trim(),
      "tipo_usuario": this.user.controls["tipo_usuario"].value
    };
    
    this.authService.ingresa_datos(us)
    .subscribe(
      _dir =>{
        this.redirect = 1;
        this.goPrincipal();
      },
      err => {console.error(err)
        this.redirect = 2;
        if (err.status == 400) {
          this.mensaje = "Una cuenta con este correo ya existe.";
        } else { 
          this.mensaje = `¡Ha ocurrido un error! \n 
            Por favor, inténtelo de nuevo más tarde.`;
        }
      }
    );
  }

  esIgual():boolean{
    return (this.user.controls["contrasena"].value) == (this.user.controls["confirmar"].value)
  }
  
  valid(field: string): boolean {
    var x = this.user.get(field)
    if (x)
      return (x.valid && (x.dirty || x.touched));
    else
      return false;
  }
  
  invalid(field: string): boolean {
    var x = this.user.get(field)
    if (x)
      return (x.invalid && (x.dirty || x.touched));
    else
      return false;
  }

  touched(field: string): boolean {
    var x = this.user.get(field);
    if (x)
      return (x.dirty || x.touched);
    else
      return false;
  }

  goBack(): void {
    this.router.navigateByUrl('/');
  }
  
  goPrincipal(): void {
    this.router.navigateByUrl('login');
  }

}
