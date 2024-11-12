import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';  // Make sure you import tap if you want to use it

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'your_api_base_url';  // Make sure to define your API URL

  constructor(private http: HttpClient) {}  // Inject HttpClient correctly

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        // If login is successful, save the token in LocalStorage
        if (response && response.token) {
          localStorage.setItem('authToken', response.token);
        }
      })
    );
  }

  // Check if the user is authenticated (token exists)
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');  // Check if the auth token exists
  }

  // Save the token
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Logout the user (remove token)
  logout(): void {
    localStorage.removeItem('authToken');
  }
}
