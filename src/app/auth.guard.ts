import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

// Notre middleware vérifie si un jeton existe dans le local storage du navigateur. Ce jeton est enregistré lors de l'authentification à l'application.

export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('access_token')) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
}
