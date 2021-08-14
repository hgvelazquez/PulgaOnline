import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';

/* Componentes del vendedor */
import { ProductosVendedorComponent } from './vendedor/productos-vendedor/productos-vendedor.component';
import { DetallesProductoVendedorComponent } from './vendedor/detalles-producto-vendedor/detalles-producto-vendedor.component';
import { AgregaProductoComponent } from './vendedor/agrega-producto/agrega-producto.component';
import { EliminaProductoComponent } from './vendedor/elimina-producto/elimina-producto.component';
import { ActualizaProductoComponent } from './vendedor/actualiza-producto/actualiza-producto.component';
import { MensajeComponent } from './vendedor/mensaje/mensaje.component';

/* Componentes de Comprar */
import { DireccionComponent} from './comprador/comprar/direccion/direccion.component'
import { PagoComponent} from './comprador/comprar/pago/pago.component'
import { PrincipalProductoComponent} from './comprador/comprar/principal-producto/principal-producto.component'

/* Componentes del Catalogo */
import { ProductosComponent } from './productos/productos.component';
import { DetallesProductoComponent } from './detalles-producto/detalles-producto.component';
import { MensajeErrorComponent } from './mensaje-error/mensaje-error.component';


const routes: Routes = [
  /* Rutas del vendedor*/
  { path: 'mis-productos', component: ProductosVendedorComponent },
  { path: 'detail/:id_producto', component: DetallesProductoVendedorComponent },
  { path: 'agregar-producto', component: AgregaProductoComponent },
  { path: 'eliminar-producto/:id_producto', component: EliminaProductoComponent },
  { path: 'actualizar-producto/:id_producto', component: ActualizaProductoComponent },
  { path: 'mensaje/:operation', component: MensajeComponent },
  /* Rutas de Comprar*/
  { path: 'producto/:id_producto', component: PrincipalProductoComponent},
  { path: 'pago', component: PagoComponent},
  { path: 'direccion', component: DireccionComponent},
  /* Rutas del Catalogo */
  { path: 'catalogo', component: ProductosComponent },
  { path: 'details/:id_producto', component: DetallesProductoComponent },
  { path: 'mensajes/:operation', component: MensajeErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }