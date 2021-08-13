import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MensajeService } from '../mensaje.service';


@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css']
})
export class MensajeComponent implements OnInit {

  mensaje: string = '';

  private op: string = '';
  private errMessage: string = `Ha ocurrido un error con 
    nuestros servidores. \n Estamos trabajando en ello, por favor inténtelo
    más tarde`;

  constructor(  
    private aroute: ActivatedRoute,
    private router: Router,
    public mensajeService: MensajeService) { }

  ngOnInit(): void {
    var op = this.aroute.snapshot.paramMap.get('operation');
    if (op) {
      this.switchMessage(op);
      this.op = op;
    }
  }

  switchMessage(op: string): void {
    if (op === 'error'){
      this.mensaje = this.errMessage;
    }
  }

  goBack() : void {
    if (this.op === 'error' || this.op === '') {
      this.router.navigateByUrl('/catalogo');
    }
  }

}
