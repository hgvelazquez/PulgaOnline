import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';
/* Componentes de Auth */
import { PaginaPrincipalComponent } from './auth/pagina-principal/pagina-principal.component';
import {LoginComponent} from './auth/login/login.component'
import {SignupComponent} from './auth/signup/signup.component'

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

/* Componentes del Catalogo */
import { ProductosComponent } from './comprador/catalogo/productos/productos.component';
import { DetallesProductoComponent } from './comprador/detalles-producto/detalles-producto.component';
import { MensajeErrorComponent } from './comprador/mensaje-error/mensaje-error.component';


const routes: Routes = [
  /* Rutas de Login y Signup */
  { path: '', component: PaginaPrincipalComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  /* Rutas del vendedor*/
  { path: 'mis-productos', component: ProductosVendedorComponent },
  { path: 'detail/:id_producto', component: DetallesProductoVendedorComponent },
  { path: 'agregar-producto', component: AgregaProductoComponent },
  { path: 'eliminar/:id_producto', component: EliminaProductoComponent },
  { path: 'actualizar/:id_producto', component: ActualizaProductoComponent },
  { path: 'mensaje/:operation', component: MensajeComponent },
  /* Rutas de Comprar*/
  { path: 'pago', component: PagoComponent},
  { path: 'direccion', component: DireccionComponent},
  /* Rutas del Catalogo */
  { path: 'catalogo', component: ProductosComponent },
  { path: 'producto/:id_producto', component: DetallesProductoComponent },
  { path: 'error', component: MensajeErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }