import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/** Importando los componentes Comprar para hacerlos rutas */
import { DireccionComponent} from './comprador/comprar/direccion/direccion.component'
import { PagoComponent} from './comprador/comprar/pago/pago.component'
import { PrincipalProductoComponent} from './comprador/comprar/principal-producto/principal-producto.component'

const routes: Routes = [
  {
    path: 'producto/:id_producto',
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
