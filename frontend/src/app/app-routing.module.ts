import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';

/* Importe sus módulos que requerirán de una ruta aquí*/
import { ProductosComponent } from './productos/productos.component';
import { DetallesProductoComponent } from './detalles-producto/detalles-producto.component';
import { MensajeErrorComponent } from './mensaje-error/mensaje-error.component';
import { ProductoBusquedaComponent } from './producto-busqueda/producto-busqueda.component';

const routes: Routes = [
  { path: 'catalogo', component: ProductosComponent },
  {path: 'catalogo', component: ProductoBusquedaComponent},
  { path: 'detail/:id_producto', component: DetallesProductoComponent },
  { path: 'mensaje/:operation', component: MensajeErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }