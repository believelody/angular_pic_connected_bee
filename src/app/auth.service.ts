import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUser: any;
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any>{
    return this.http
      .post('/.netlify/functions/app/login', {email, password})
      .pipe(map(res => {
        if (res['success']) {
          localStorage.setItem('access_token', res['token']);          
          this.authUser = res['user'];          
        }
        return res;
      })
    );
  }

  logout() {
    localStorage.removeItem('access_token');
    this.authUser = null;
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }

  getAuthUser() {
    //  Lors de l'authentification, un jeton est envoyé par le serveur. Cependant, le serveur envoie aussi un ibjet contenant les informations de l'utilisateur authentifié
    return this.authUser;
  }
}
