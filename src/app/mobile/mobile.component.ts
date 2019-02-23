import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})
export class MobileComponent implements OnInit {
  isLogged: boolean = false;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.isLogged = this.auth.loggedIn;
  }

  ngDoCheck() {
    this.isLogged = this.auth.loggedIn;
  }

}
