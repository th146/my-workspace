import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { LoginService } from './login.service'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule], 
  template: `
    <form [formGroup]="form" (ngSubmit)="loginUserSubmit()">
      <table class="w-full">
        <tr>
          <td class="w-1/3">Name</td>
          <td>
            <input type="text" formControlName="name" class="dark:bg-slate-900 w-full" />
            <div *ngIf="form.controls['name'].invalid && (form.controls['name'].touched || form.controls['name'].dirty)">
              Please provide your name
            </div>
          </td>
        </tr>
        <tr>
          <td class="w-1/3">Password</td>
          <td>
            <input type="password" formControlName="password" class="dark:bg-slate-900 w-full" />
            <div *ngIf="form.controls['password'].invalid && (form.controls['password'].touched || form.controls['password'].dirty)">
              Please provide your password
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="2" class="text-center">
            <button 
              type="submit" 
              [disabled]="form.invalid" 
              class="bg-indigo-400 hover:bg-indigo-300 dark:bg-indigo-700 px-2 py-1 dark:hover:bg-indigo-600 rounded">
              Login
            </button>
          </td>
        </tr>
      </table>
    </form>
  `,
  styles: [],
})
export class LoginComponent implements OnInit {
  form!: FormGroup; 
  token: string | null = null;
  
  constructor(
    private loginService: LoginService,  
    private router: Router               
  ) {}

  ngOnInit(): void {
    
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),  
      password: new FormControl('', [Validators.required]),  
    });
  }

  loginUserSubmit() {
    if (this.form.valid) {
      const loginData = {
        name: this.form.value.name,
        password: this.form.value.password,
      };
  
      
      this.loginService.login(loginData.name, loginData.password).subscribe({
        next: (response) => {
          console.log('Login erfolgreich:', response);
  
          
          if (response) {
            
            const token = response.access_token || response; 
            this.loginService.saveToken(token);
            this.token = token;  
          
            
            console.log('Token gespeichert:', localStorage.getItem('access_token'));  
          
            
            this.router.navigate(['/appointments']);
          } else {
            console.error('Token nicht im Response gefunden!');
          }
          
        },
        error: (err) => {
          console.error('Login fehlgeschlagen:', err);
        },
      });
    } else {
      console.log('Formular ist ungültig');
    }
  }
  
  
  
  
  
  
  
}
