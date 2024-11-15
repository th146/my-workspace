import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  saveToken(token: string): void {
    console.log('Saving token:', token);  // Ausgabe des Tokens
    localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    const token = localStorage.getItem('access_token');
    console.log('Retrieved token:', token);  // Ausgabe des abgerufenen Tokens
    return token;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    console.log('Token gefunden:', token);  // Überprüfung in der Konsole
    return !!token;
  }
  

  clearToken(): void {
    console.log('Clearing token');
    localStorage.removeItem('access_token');
  }

  getUsernameFromToken(): string {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return '';
    }
    const [, payload] = token.split('.');
    const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/')); // Base64URL Dekodierung
    const { username } = JSON.parse(decodedPayload); // Benutzername aus dem Payload extrahieren
    return username ?? ''; // Rückgabe des Benutzernamens
  }
}
