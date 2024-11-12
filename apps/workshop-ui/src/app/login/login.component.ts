import { Component } from '@angular/core';
import { Router } from '@angular/router';  
import { HttpClient } from '@angular/common/http'; 
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <h2>Login</h2>
      <button (click)="loginWithGoogle()" class="google-login-btn">
        Login with Google
      </button>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
    }
    h2 {
      margin-bottom: 20px;
      color: #333;
    }
    .google-login-btn {
      background-color: #4285F4;
      color: white;
      border: none;
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
      border-radius: 4px;
    }
    .google-login-btn:hover {
      background-color: #357ae8;
    }
  `]
})
export class LoginComponent {
  constructor(
    private authService: AuthService,  
    private router: Router,            
    private http: HttpClient           
  ) {}

  // Login mit Google 
  loginWithGoogle(): void {
    this.http.post('http://localhost:3000/auth/login', {}).subscribe((response: any) => {
      const token = response.token;  // Token, das vom Backend zurückgegeben wird
      this.authService.saveToken(token);  // Token im LocalStorage speichern
      this.router.navigate(['/dashboard']);  // Weiterleitung zum Dashboard
    }, error => {
      console.error('Login failed', error);  // Fehlerprotokollierung bei fehlgeschlagenem Login
    });
  }
}
