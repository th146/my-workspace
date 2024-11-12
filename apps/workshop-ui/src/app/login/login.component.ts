// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';  
import { HttpClient } from '@angular/common/http'; 
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private authService: AuthService,  
    private router: Router,            
    private http: HttpClient           
  ) {}

  // Login mit Google 
  loginWithGoogle(): void {
    this.http.post('your-backend-url/auth/google', {}).subscribe((response: any) => {
      const token = response.token;  // Token, das vom Backend zurückgegeben wird
      this.authService.saveToken(token);  // Token im LocalStorage speichern
      this.router.navigate(['/dashboard']);  // Weiterleitung zum Dashboard
    });
  }
}
