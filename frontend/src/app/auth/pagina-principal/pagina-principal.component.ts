import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthCheckService } from '../../auth-check.service';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent implements OnInit {

  constructor(
    private router: Router,
    private authCheck: AuthCheckService,
  ) { }

  ngOnInit(): void {
    this.authCheck.isNotLogged(this.router);
  }

  goLogin(): void {
    this.router.navigateByUrl('login');
  }

  goSignup(): void {
    this.router.navigateByUrl('signup');
  }

}
