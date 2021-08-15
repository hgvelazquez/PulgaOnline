import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service'
import { Router } from '@angular/router';
import {FormControl,Validators, FormGroup } from '@angular/forms' /**sirve para controlar los formularios, add in app.module.ts */

import { FormsValidatorService } from '../../forms-validator.service'

import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  redirect = 0;
  mensaje = "";

  user = new FormGroup({
    correo : new FormControl('',[
      Validators.required,
      Validators.email,
      this.formService.validateLengthString(6, 30),
    ]),
    contrasena : new FormControl('',[
      Validators.required,
      this.formService.validateLengthString(6, 20)
    ])
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private formService: FormsValidatorService,
    private cookies: CookieService
  ) { }
  
  ngOnInit(): void {
  }

  validar_datos(): void{
    const us = {
      "correo":this.user.controls["correo"].value,
      "contrasena": this.user.controls["contrasena"].value
    };
    
    this.authService.login(us)
    .subscribe(
      dir =>{
        this.redirect = 1;
        this.goPrincipal(dir.tipo_usuario);
        console.log(dir);
        this.cookies.set('loggedIn', 'true');
        this.cookies.set('id_usuario', dir.id_usuario, 1);
        this.cookies.set('tipo_usuario', dir.tipo_usuario, 1);
        this.cookies.set('correo', dir.correo, 1);
      },
      err => {
        console.error(err)
        this.redirect = 2;
        if (err.status == 401) {
          this.mensaje = err.error;
        } else { 
          this.mensaje = `¡Ha ocurrido un error! \n 
            Por favor, inténtelo de nuevo más tarde.`;
        }
      }
    );
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

goBack(): void {
  this.router.navigateByUrl('/');
}

goPrincipal(tipo: boolean): void {
  if (tipo) /* Vendedor */
    this.router.navigateByUrl('/mis-productos');
  else
    this.router.navigateByUrl('/catalogo'); 
}

}


