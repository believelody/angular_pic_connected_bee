import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {
  @Input('sidenavMobile') sidenav: any;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }

  close() {
    if (window.screen.width < 1024) {
      this.sidenav.close();      
    }
  }

  logout() {
    this.close();
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
