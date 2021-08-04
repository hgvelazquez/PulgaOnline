import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/** Importando los componentes Comprar para hacerlos rutas */
import { DireccionComponent} from './comprar/direccion/direccion.component'
import { PagoComponent} from './comprar/pago/pago.component'
import { PrincipalProductoComponent} from './comprar/principal-producto/principal-producto.component'

const routes: Routes = [
  {
    path: 'producto',
    component: PrincipalProductoComponent
  },
  {
    path: 'pago',
    component: PagoComponent
  },
  {
    path: 'direccion',
    component: DireccionComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
