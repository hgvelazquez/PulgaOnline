import { Component, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private cookies: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout(): void{
    console.log("Logging Out");
    this.cookies.deleteAll();
    this.router.navigateByUrl('/');
  }

}
