import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AfterLoginGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const isBrowser = typeof window !== 'undefined';
      const isLoggedIn = isBrowser ? sessionStorage.getItem('isLoggedIn') : null;
    if (isLoggedIn) {
      this.router.navigate(['/events']);
      return false;
    } else {
      return true;
    }
  }
}