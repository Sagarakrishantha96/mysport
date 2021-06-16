import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this._authService.currentUserValue;

    if (currentUser) {
      if (route.data.roles && route.data.roles.indexOf(currentUser.RoleId) === -1) {
        this.router.navigate(['/']);
        return false;
      }
      return true
    } else {
      this.router.navigate(['/home'])
      return false
    }
  }

}
