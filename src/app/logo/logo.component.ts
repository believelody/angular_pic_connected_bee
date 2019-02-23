import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {
  user: any;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.user = this.auth.getAuthUser() ? this.auth.getAuthUser() : null;
  }

  ngDoCheck() {
    this.user = this.auth.getAuthUser() ? this.auth.getAuthUser() : null;
  }
}
