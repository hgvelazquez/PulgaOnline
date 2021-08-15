import { Component, OnInit } from '@angular/core';

import  {AuthService} from '../auth.service'
import { Router , ActivatedRoute } from '@angular/router';
import {FormControl,Validators, FormGroup} from '@angular/forms' /**sirve para controlar los formularios, add in app.module.ts */
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  tipos = ["vendedor", "comprador" ]
  redirect = 0
  mensaje = ""
  user = new FormGroup({
    nombre : new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(15)]),
    correo : new FormControl('',[
      Validators.required,
      Validators.email,
  	  //Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
      Validators.minLength(6),
      Validators.maxLength(30)]),
    contrasena : new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(16)]),
    confirmar: new FormControl( '', [Validators.required]),
    tipo_usuario : new FormControl('',[
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)])
    });

  constructor(private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  enviar_datos(): void{
    const us={
    "nombre":this.user.controls["nombre"].value,
    "correo":this.user.controls["correo"].value, /* error con el nombre en la bases de datos*/
    "contrasena": this.user.controls["contrasena"].value,
    "tipo_usuario": this.user.controls["tipo_usuario"].value
   };
    
    this.authService.ingresa_datos(us)
    .subscribe(
         dir =>{
          this.redirect = 1
          console.log(dir)},
        err => {console.error(err)
          this.mensaje = err.error
          
          this.redirect = 2
      });
  }

esIgual():boolean{
  return (this.user.controls["contrasena"].value) == (this.user.controls["confirmar"].value)
}
onSubmit() {
  // TODO: Use EventEmitter with form value
  console.warn(this.user.value);
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
goPrincipal(): void {
  this.router.navigateByUrl('login');
}

}
