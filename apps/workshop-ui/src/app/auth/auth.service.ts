import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  saveToken(token: string): void {
    console.log('Saving token:', token);  
    localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    const token = localStorage.getItem('access_token');
    console.log('Retrieved token:', token);  
    return token;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    console.log('Token gefunden:', token);  
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
    const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/')); 
    const { username } = JSON.parse(decodedPayload); 
    return username ?? ''; 
  }

  getRoleFromToken(): string {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return '';
    }
    const [, payload] = token.split('.');
    const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/')); 
    const { role } = JSON.parse(decodedPayload); 
    return role ?? ''; 
  }
}
