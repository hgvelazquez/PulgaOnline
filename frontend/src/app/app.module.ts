import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalProductoComponent } from './comprar/principal-producto/principal-producto.component';
import { DireccionComponent } from './comprar/direccion/direccion.component';
import { PagoComponent } from './comprar/pago/pago.component';


import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
/*Para recibir del back*/
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
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
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
