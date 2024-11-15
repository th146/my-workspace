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
  
    // `access_token` aus dem LocalStorage holen und Leerzeichen entfernen
    const token = localStorage.getItem("access_token")?.trim();
  
    if (token) {
      console.log("Token gefunden:", token);  // Ausgabe des Tokens zur Überprüfung
  
      // Token in drei Teile zerlegen
      const parts = token.split('.');
  
      // Überprüfen, ob das Token im erwarteten JWT-Format ist (drei Teile)
      if (parts.length === 3) {
        try {
          // Payload-Teil des Tokens (Index 1) extrahieren
          const payload = parts[1];
  
          // Base64URL Decoding
          const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
  
          // Payload in JSON-Objekt umwandeln
          const jsonPayload = JSON.parse(decodedPayload);
  
          // Username aus dem Payload extrahieren
          console.log("Username:", jsonPayload.username);
          console.log("Role:", jsonPayload.role);
        } catch (error) {
          console.error("Fehler beim Decodieren oder Parsen des Tokens:", error);
        }
      } else {
        console.log("Ungültiges Token-Format. Erwartet wurden drei Teile durch '.' getrennt. Teile:", parts);
      }
    } else {
      console.log("Kein access_token im LocalStorage gefunden.");
    }
  
    // Authentifizierung prüfen
    if (!this.authService.isAuthenticated()) {
      console.log('User is not authenticated, redirecting to login');  // Wenn der Benutzer nicht authentifiziert ist
      this.router.navigate(['users/login']);
      return false;
    }
    
    console.log('User is authenticated, access granted');  // Wenn der Benutzer authentifiziert ist
    return true;
  }
  
  
  
}
