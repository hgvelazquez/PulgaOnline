import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';

import { ProductosComponent } from './productos/productos.component';
import { DetallesProductoComponent } from './detalles-producto/detalles-producto.component';
import { MensajeComponent } from './mensaje/mensaje.component';
import { ProductoBusquedaComponent } from './producto-busqueda/producto-busqueda.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    DetallesProductoComponent,
    MensajeComponent,
    ProductoBusquedaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
