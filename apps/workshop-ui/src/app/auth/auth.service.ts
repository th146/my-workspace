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
}
