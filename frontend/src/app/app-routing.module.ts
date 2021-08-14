import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/** Importando los componentes Comprar para hacerlos rutas */
import { DireccionComponent} from './comprar/direccion/direccion.component'
import { PagoComponent} from './comprar/pago/pago.component'
import { PrincipalProductoComponent} from './comprar/principal-producto/principal-producto.component'
import {LoginComponent} from './auth/login/login.component'
import {SigninComponent} from './auth/signin/signin.component'
const routes: Routes = [
  {path: 'producto/:id_producto',
    component: PrincipalProductoComponent},
  {path: 'pago',
    component: PagoComponent},
  {path: 'direccion',
    component: DireccionComponent},
  {path: 'login',
    component: LoginComponent},
  {path: 'signin',
    component: SigninComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
