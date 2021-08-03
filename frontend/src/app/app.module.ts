import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { ProductosVendedorComponent } from './productos-vendedor/productos-vendedor.component';
import { DetallesProductoVendedorComponent } from './detalles-producto-vendedor/detalles-producto-vendedor.component';
import { AgregaProductoComponent } from './agrega-producto/agrega-producto.component';
import { ActualizaProductoComponent } from './actualiza-producto/actualiza-producto.component';
import { EliminaProductoComponent } from './elimina-producto/elimina-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductosVendedorComponent,
    DetallesProductoVendedorComponent,
    AgregaProductoComponent,
    ActualizaProductoComponent,
    EliminaProductoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
