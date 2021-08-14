import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
/* Angular imports*/
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Comprador */
/* Catalogo */
import { ProductosComponent } from './productos/productos.component';
import { DetallesProductoComponent } from './detalles-producto/detalles-producto.component';
import { ProductoBusquedaComponent } from './producto-busqueda/producto-busqueda.component';
import { MensajeErrorComponent } from './mensaje-error/mensaje-error.component';
/* Comprar*/
import { PrincipalProductoComponent } from './comprador/comprar/principal-producto/principal-producto.component';
import { DireccionComponent } from './comprador/comprar/direccion/direccion.component';
import { PagoComponent } from './comprador/comprar/pago/pago.component';

/* Vendedor */
import { ProductosVendedorComponent } from './vendedor/productos-vendedor/productos-vendedor.component';
import { DetallesProductoVendedorComponent } from './vendedor/detalles-producto-vendedor/detalles-producto-vendedor.component';
import { AgregaProductoComponent } from './vendedor/agrega-producto/agrega-producto.component';
import { ActualizaProductoComponent } from './vendedor/actualiza-producto/actualiza-producto.component';
import { EliminaProductoComponent } from './vendedor/elimina-producto/elimina-producto.component';
import { MensajeComponent } from './vendedor/mensaje/mensaje.component';

@NgModule({
  declarations: [
    AppComponent,
    /* Vendedor*/
    ProductosVendedorComponent,
    DetallesProductoVendedorComponent,
    AgregaProductoComponent,
    ActualizaProductoComponent,
    EliminaProductoComponent,
    MensajeComponent,
    /* Comprar */
    PrincipalProductoComponent,
    DireccionComponent,
    PagoComponent,
    /* Catalogo*/
    ProductosComponent,
    DetallesProductoComponent,
    ProductoBusquedaComponent,
    MensajeErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
