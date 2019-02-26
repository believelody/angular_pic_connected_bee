import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = "";
  password: string = "";
  error: Object = {
    email: {
      flag: false,
      msg: ''
    },
    password: {
      flag: false,
      msg: ''
    },
    authEmail: {
      flag: false,
      msg: ''
    },
    authPassword: {
      flag: false,
      msg: ''
    }
  };
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.auth.loggedIn) this.router.navigate(['']);
  }

  submit() {
    this.auth
      .login(this.email, this.password)
      .subscribe(
        res => {
          console.log(res);
          if (res.success) {
            this.router.navigate(['']);            
          } else {
            if (res.code === "email") {
              this.error['email'].flag = true;
              this.error['email'].msg = res.msg;
            }

            if (res.code === "password") {
              this.error['password'].flag = true;
              this.error['password'].msg = res.msg;
            }

            if (res.code === "auth-email") {
              this.error['authEmail'].flag = true;
              this.error['authEmail'].msg = res.msg;
            }

            if (res.code === "auth-password") {
              this.error['authPassword'].flag = true;
              this.error['authPassword'].msg = res.msg;
            }
          }
        },
        err => this.error = 'Could not authenticate'
      );
  }

}
