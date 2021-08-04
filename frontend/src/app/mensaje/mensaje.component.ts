import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css']
})
export class MensajeComponent implements OnInit {

  mensaje: string = '';

  private op: string = '';
  private addMessage: string = 'El producto ha sido añadido con éxito.';
  private delMessage: string = 'El producto ha sido eliminado con éxito.';
  private errMessage: string = `Ha ocurrido un error con 
    nuestros servidores. \n Estamos trabajando en ello, por favor inténtelo
    más tarde`;

  constructor(
    private aroute: ActivatedRoute,
    private router: Router
  ) 
  { }

  ngOnInit(): void {
    var op = this.aroute.snapshot.paramMap.get('operation');
    if (op) {
      this.switchMessage(op);
      this.op = op;
    }
  }

  switchMessage(op: string): void {
    if (op === 'agregar') {
      this.mensaje = this.addMessage;
    } else if (op === 'eliminar') {
      this.mensaje = this.delMessage;
    } else if (op === 'error'){
      this.mensaje = this.errMessage;
    }
  }

  goBack() : void {
    if (this.op === 'eliminar' || this.op ==='agregar' 
        || this.op === 'error' || this.op === '') {
      this.router.navigateByUrl('/mis-productos');
    }
  }

}
