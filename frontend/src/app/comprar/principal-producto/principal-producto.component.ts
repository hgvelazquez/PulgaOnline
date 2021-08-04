import { Component, OnInit } from '@angular/core';

/** importo servcio de comprar y el producto */
import {ComprarService} from '../comprar.service'
import {Producto} from '../../producto';
import { Router , ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-principal-producto',
  templateUrl: './principal-producto.component.html',
  styleUrls: ['./principal-producto.component.css']
})
export class PrincipalProductoComponent implements OnInit {
  
  id: string ="-1";
  producto : Producto | undefined;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private comprarService: ComprarService
  ) { }

  ngOnInit(): void {
    this.getProd()
  }

  getProd(): void {
    const id = String(this.route.snapshot.paramMap.get('id_producto'));
    if (id)
        this.id = id;
    this.comprarService.getProducto(id)
      .subscribe(
        (producto) => {this.producto = producto});
  }
}
