import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { Appointment, Branch } from '@my-workspace/api-interfaces';
import { Observable } from 'rxjs';
import { AppointmentsService } from '../appointments.service';
import { map } from 'rxjs/operators';
import { BranchesService } from '../branches.service';
import { LoginService } from '../login/login.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'workshop-appointment-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="form-container">
    <button (click)="logout()" class="btn-logout">Logout</button> <!-- Logout-Button hinzugefügt -->
  <h2>Appointments</h2>

  <div class="branches-row">
    <div *ngFor="let group of appointmentsByBranch$ | async" class="branch-group">
      <h3>{{ group.branch }}</h3>
      <div class="appointment-list">
        <div *ngFor="let appointment of group.appointments" class="appointment-item">
          <a [routerLink]="['/appointments', appointment.id]" class="appointment-link">
            <div class="appointment-header">
              <span class="owner">{{ appointment.vehicleOwner }}</span>
            </div>
            <div class="appointment-reg">
              <span>{{ appointment.vehicleRegNo }}</span>
            </div>
            <div class="appointment-details">
              <span class="date-time">{{ appointment.date | date: 'longDate' }} - {{ appointment.time }}</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>

  <div class="form-buttons">
    <button (click)="navigateToCreateAppointment()" class="btn-save">
      Create New Appointment
      </button>
    <!-- Zeige den Button nur an, wenn der Benutzer "admin" ist -->
        <button *ngIf="isAdmin" (click)="navigateToBranches()" class="btn-save">
          Branches List
        </button>
</div>
  `,
  styles: [`
    .form-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 800px;
  margin: auto;
  padding: 2rem;
  border-radius: 8px;
  background-color: #f7f9fc;
  align-items: center; /* Zentriert die Überschrift horizontal */
}

h2 {
  text-align: center; /* Stellt sicher, dass der Text innerhalb des h2 zentriert ist */
  width: 100%; /* Optional: Falls du sicherstellen möchtest, dass es den ganzen Platz einnimmt */
}

.branches-row {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center; /* Optional, um die Elemente in der Mitte auszurichten */
}

.branch-group {
  flex: 1 1 200px; /* Alle Container erhalten die gleiche Basisgröße */
  max-width: 200px; /* Maximalbreite sicherstellen */
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background-color: #ffffff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h3 {
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
  color: #1f2937;
}

.appointment-list {
  margin-top: 1rem;
}

.appointment-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background-color: #fafafa;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.appointment-link {
  color: #4f46e5;
  text-decoration: none;
  display: block;
}

.appointment-header {
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
}

.appointment-reg {
  font-size: 1rem;
  color: #4b5563;
  margin-bottom: 0.3rem;
}

.appointment-details .date-time {
  font-size: 0.85rem;
  color: #6b7280;
}

.form-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  justify-content: center;
}

.btn-save {
  padding: 0.6rem 1.2rem;
  background-color: #4f46e5;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-logout {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  background-color: #6b7280; /* Grau */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-logout:hover {
  background-color: #4b5563; /* Dunkleres Grau für Hover-Effekt */
}

.btn-save:hover {
  background-color: #6366f1;
}

@media (max-width: 600px) {
  .form-container {
    padding: 1rem;
  }
  h2, h3 {
    font-size: 1.1rem;
  }
}

  `],
})
export class AppointmentListComponent implements OnInit {
  appointmentsByBranch$!: Observable<{ branch: string; appointments: Appointment[] }[]>;
  branches: Branch[] = [];
  isAdmin = false; // isAdmin-Flag hinzugefügt
  isUser = false; // isUser-Flag hinzugefügt

  constructor(
    private readonly appointmentsService: AppointmentsService,
    private readonly branchesService: BranchesService,
    private readonly router: Router,
    private readonly loginService: LoginService,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    const role = this.authService.getRoleFromToken();
    const name = this.authService.getUsernameFromToken();
    console.log('Role:', role);
    this.isAdmin = role === 'admin';
    this.isUser = role === 'user';

    this.branchesService.getBranches().subscribe({
      next: (branches) => {
        this.branches = branches;
        this.appointmentsByBranch$ = this.appointmentsService.getAll().pipe(
          map(appointments =>
            appointments.reduce((acc, appointment) => {
              const branch = this.branches.find(b => b.name === appointment.branch) || { name: 'Unknown Branch' };
              let group = acc.find(g => g.branch === branch.name);
              if (!group) {
                group = { branch: branch.name, appointments: [] };
                acc.push(group);
              }
              group.appointments.push(appointment);
              return acc;
            }, [] as { branch: string; appointments: Appointment[] }[])
          )
        );
      },
      error: (err) => console.error('Fehler beim Laden der Standorte:', err),
    });
  }

  navigateToCreateAppointment(): void {
    this.router.navigate(['/create-appointment']);
  }
  
  

  navigateToBranches(): void {
    this.router.navigate(['/branches']);
  }

  logout(): void {
    this.loginService.removeToken(); // Token entfernen
    this.router.navigate(['/users/login']); // Zur Login-Seite navigieren
  }
}
