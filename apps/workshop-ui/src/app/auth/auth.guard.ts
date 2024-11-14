import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('Checking authentication for route:', state.url);  // Gibt die URL der angeforderten Route aus
    if (!this.authService.isAuthenticated()) {
      console.log('User is not authenticated, redirecting to login');  // Wenn der Benutzer nicht authentifiziert ist
      this.router.navigate(['users/login']);
      return false;
    }
    console.log('User is authenticated, access granted');  // Wenn der Benutzer authentifiziert ist
    return true;
  }
}
