import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Importe sus módulos que requerirán de una ruta aquí*/
import { ProductosVendedorComponent } from './productos-vendedor/productos-vendedor.component';
import { DetallesProductoVendedorComponent } from './detalles-producto-vendedor/detalles-producto-vendedor.component';
import { AgregaProductoComponent } from './agrega-producto/agrega-producto.component';
import { EliminaProductoComponent } from './elimina-producto/elimina-producto.component';
import { ActualizaProductoComponent } from './actualiza-producto/actualiza-producto.component';
import { MensajeComponent } from './mensaje/mensaje.component';

const routes: Routes = [
  { path: 'mis-productos', component: ProductosVendedorComponent },
  { path: 'detail/:id_producto', component: DetallesProductoVendedorComponent },
  { path: 'agregar-producto', component: AgregaProductoComponent },
  { path: 'eliminar-producto/:id_producto', component: EliminaProductoComponent },
  { path: 'actualizar-producto/:id_producto', component: ActualizaProductoComponent },
  { path: 'mensaje/:operation/:success', component: MensajeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
