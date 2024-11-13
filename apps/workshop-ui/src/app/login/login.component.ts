import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';  // Für HTTP-Anfragen

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <h2>Login</h2>
      <!-- Google Sign-In Button -->
      <div id="google-signin-button"></div>
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
  `]
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient  // Für HTTP-Anfragen zum Backend
  ) {}

  ngOnInit(): void {
    this.loadGoogleScript().then(() => {
      this.initializeGoogleAuth();
    });
  }

  // Methode zum Laden des Google-Skripts und Warten auf das Laden
  loadGoogleScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => resolve();
      script.onerror = (error) => reject(error);
      document.body.appendChild(script);
    });
  }

  // Methode zur Initialisierung des Google-Logins nach dem Laden des Skripts
  initializeGoogleAuth(): void {
    const clientId = document.querySelector('meta[name="google-signin-client_id"]')?.getAttribute('content');
    if (clientId) {
      // Google Identity Services (GIS) Setup
      google.accounts.id.initialize({
        client_id: clientId!,
        callback: this.onGoogleLogin.bind(this)
      });

      // Render the Google Sign-In button
      google.accounts.id.renderButton(
        document.getElementById('google-signin-button')!, 
        { theme: 'outline', size: 'large' }
      );
    } else {
      console.error('Google Client ID not found');
    }
  }

  // Callback nach erfolgreichem Google-Login
  onGoogleLogin(response: any): void {
    const token = response.credential; // Das Token aus der Antwort holen
    this.authService.saveToken(token);  // Das Token im AuthService speichern
    
    // Anfrage an das Backend senden, um den User zu authentifizieren
    this.http.post('http://localhost:3000/auth/google', { token }).subscribe(
      (data: any) => {
        this.authService.saveToken(data.access_token);  // JWT vom Backend speichern
        this.router.navigate(['/appointments']);  // Weiterleitung zur appointments-Seite
      },
      (error) => {
        console.error('Error during Google login', error);
      }
    );
  }
}
