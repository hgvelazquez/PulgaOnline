import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mensaje-error',
  templateUrl: './mensaje-error.component.html',
  styleUrls: ['./mensaje-error.component.css']
})
export class MensajeErrorComponent implements OnInit {

  public mensaje: string = `Ha ocurrido un error con 
    nuestros servidores. \n Estamos trabajando en ello, por favor inténtelo
    más tarde`;

  constructor(  
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goBack() : void {
    this.router.navigateByUrl('/catalogo');
  }

}
