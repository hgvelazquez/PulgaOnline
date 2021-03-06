import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { createNgModuleType } from '@angular/compiler/src/render3/r3_module_compiler';

@Injectable({
  providedIn: 'root'
})
export class AuthCheckService {

  constructor(
    private cookies: CookieService,
  ) { }

  isLoggedVendedor(): boolean {
    const logged = this.cookies.check('loggedIn');
    const hay_tipo = this.cookies.check('tipo_usuario');
    if (!logged || !hay_tipo){
      return false;
    } else {
      const tipo = this.cookies.get('tipo_usuario');
      return tipo === "true";
    }
  }

  isLoggedComprador(): boolean {
    const logged = this.cookies.check('loggedIn');
    const hay_tipo = this.cookies.check('tipo_usuario');
    if (!logged || !hay_tipo){
      return false;
    } else {
      const tipo = this.cookies.get('tipo_usuario');
      return tipo === "false";
    }
  }

  isNotLogged(router: Router): void {
    const logged = this.cookies.check('loggedIn');
    const hay_tipo = this.cookies.check('tipo_usuario');
    if (!logged || !hay_tipo)
      return;
    const tipo = this.cookies.get('tipo_usuario');
    if (tipo === 'true')
      router.navigateByUrl('mis-productos');
    if (tipo === 'false')
      router.navigateByUrl('catalogo');
    return;  
  }
}
