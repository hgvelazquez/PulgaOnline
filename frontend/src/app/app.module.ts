import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
/* Angular imports*/
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

/* Vendedor */
import { PrincipalProductoComponent } from './comprador/comprar/principal-producto/principal-producto.component';
import { DireccionComponent } from './comprador/comprar/direccion/direccion.component';
import { PagoComponent } from './comprador/comprar/pago/pago.component';

/* Comprador*/
import { ProductosVendedorComponent } from './productos-vendedor/productos-vendedor.component';
import { DetallesProductoVendedorComponent } from './detalles-producto-vendedor/detalles-producto-vendedor.component';
import { AgregaProductoComponent } from './agrega-producto/agrega-producto.component';
import { ActualizaProductoComponent } from './actualiza-producto/actualiza-producto.component';
import { EliminaProductoComponent } from './elimina-producto/elimina-producto.component';
import { MensajeComponent } from './mensaje/mensaje.component';

@NgModule({
  declarations: [
    ProductosVendedorComponent,
    DetallesProductoVendedorComponent,
    AgregaProductoComponent,
    ActualizaProductoComponent,
    EliminaProductoComponent,
    MensajeComponent,
    AppComponent,
    PrincipalProductoComponent,
    DireccionComponent,
    PagoComponent
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
