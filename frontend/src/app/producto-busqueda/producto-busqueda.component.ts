import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';


import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Producto } from '../models/producto';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-producto-busqueda',
  templateUrl: './producto-busqueda.component.html',
  styleUrls: ['./producto-busqueda.component.css']
})
export class ProductoBusquedaComponent implements OnInit {

  //productos: Producto[] = [];
  productos$!: Observable<Producto[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private prodService: ProductoService
  ) {}

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.productos$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.prodService.buscaProductos(term)),
    );
  }

}
