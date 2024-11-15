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
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('Checking authentication for route:', state.url);


    const token = localStorage.getItem("access_token")?.trim();

    if (token) {
      console.log("Token gefunden:", token);


      const parts = token.split('.');


      if (parts.length === 3) {
        try {

          const payload = parts[1];


          const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));


          const jsonPayload = JSON.parse(decodedPayload);


          console.log("Username:", jsonPayload.username);
          console.log("Role:", jsonPayload.role);

          if (state.url.includes('branch') && jsonPayload.role !== 'admin') {
            console.log('User does not have admin role, redirecting to login');
            this.router.navigate(['appointments']);
            return false;
          }
        } catch (error) {
          console.error("Fehler beim Decodieren oder Parsen des Tokens:", error);
        }
      } else {
        console.log("Ungültiges Token-Format. Erwartet wurden drei Teile durch '.' getrennt. Teile:", parts);
      }
    } else {
      console.log("Kein access_token im LocalStorage gefunden.");
    }


    if (!this.authService.isAuthenticated()) {
      console.log('User is not authenticated, redirecting to login');
      this.router.navigate(['users/login']);
      return false;
    }

    console.log('User is authenticated, access granted');
    return true;
  }



}
