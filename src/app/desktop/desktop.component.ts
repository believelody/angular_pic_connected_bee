import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.scss']
})
export class DesktopComponent implements OnInit {
  isLogged: boolean = false;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.isLogged = this.auth.loggedIn;
  }

  ngDoCheck() {
    this.isLogged = this.auth.loggedIn;
  }


}
