import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { ProductoVendedorService } from '../producto-vendedor.service';
import { API_URL } from '../env'

@Component({
  selector: 'app-elimina-producto',
  templateUrl: './elimina-producto.component.html',
  styleUrls: ['./elimina-producto.component.css']
})
export class EliminaProductoComponent implements OnInit {

  private deleteURL : string = API_URL + '/eliminar-producto/';
  private userID: number = 1;
  private prodID: number = -1;

  constructor(
    private location: Location,
    private aroute: ActivatedRoute,
    private router: Router,
    private prodServ: ProductoVendedorService
  ) { }

  ngOnInit(): void {
    var id = this.aroute.snapshot.paramMap.get('id_producto');
    if (id)
      this.prodID = parseInt(id); 
  }

  goBack(): void {
    this.location.back();
  }

  delete(): void {
    
    this.prodServ.eliminaProducto(this.prodID).subscribe(
      _ =>  {this.router.navigate(['/mensaje/eliminar']);}, 
      _error => {this.router.navigate(['/mensaje/error']);}
    );
  }

}
