import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Appointment } from '@my-workspace/api-interfaces';
import { Observable } from 'rxjs';
import { AppointmentsService } from '../appointments.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'workshop-appointment-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="appointment-list-container">
      <h2>Appointments</h2>

      <div class="branches-row">
        <div *ngFor="let group of appointmentsByBranch$ | async" class="branch-group">
          <h3>{{ group.branch }}</h3>
          <div class="appointment-list">
            <div *ngFor="let appointment of group.appointments" class="appointment-item">
              <a [routerLink]="[appointment.id]" class="appointment-link">
                <span class="owner">{{ appointment.vehicleOwner }}</span> - 
                <span class="reg">{{ appointment.vehicleRegNo }}</span>
              </a>
              <div class="appointment-details">
                <span class="date-time">{{ appointment.date | date: 'longDate' }} - {{ appointment.time }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="create-button-container">
        <button routerLink="/appointments/create-appointment" class="btn-create">
          + Create New Appointment
        </button>
      </div>
    </div>
  `,
  styles: [`
    .appointment-list-container {
      max-width: 1000px;
      margin: 2rem auto;
      padding: 2rem;
      border-radius: 8px;
      background-color: #f7f9fc;
      text-align: center;
    }
    h2 {
      font-size: 1.8rem;
      margin-bottom: 1.5rem;
      color: #1f2937;
    }
    .branches-row {
      display: flex;
      gap: 2rem;
      justify-content: space-between;
      padding: 1rem 0;
      flex-wrap: wrap;
    }
    .branch-group {
      flex: 1 1 30%;
      min-width: 200px;
      max-width: 300px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 1rem;
      background-color: #ffffff;
      text-align: left;
      transition: flex-basis 0.3s ease;
    }
    .branch-group h3 {
      font-size: 1.2rem;
      color: #1f2937;
      margin-bottom: 1rem;
      text-align: center;
    }
    .appointment-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .appointment-item {
      padding: 0.75rem;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      background-color: #f9fafb;
    }
    .appointment-link {
      font-size: 1.1rem;
      font-weight: 500;
      color: #4f46e5;
      text-decoration: none;
    }
    .appointment-link:hover {
      color: #6366f1;
    }
    .appointment-details {
      font-size: 0.875rem;
      color: #6b7280;
      margin-top: 0.3rem;
    }
    .create-button-container {
      margin-top: 1.5rem;
      display: flex;
      justify-content: center;
    }
    .btn-create {
      padding: 0.8rem 1.5rem;
      font-size: 1rem;
      color: #ffffff;
      background-color: #4f46e5;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .btn-create:hover {
      background-color: #6366f1;
    }
    @media (max-width: 600px) {
      .appointment-list-container {
        padding: 1rem;
      }
      h2 {
        font-size: 1.5rem;
      }
      .branch-group {
        min-width: 100%;
      }
      .appointment-link {
        font-size: 1rem;
      }
    }
  `],
})
export class AppointmentListComponent implements OnInit {
  appointmentsByBranch$!: Observable<{ branch: string; appointments: Appointment[] }[]>;

  constructor(private readonly appointmentsService: AppointmentsService) {}

  ngOnInit(): void {
    this.appointmentsByBranch$ = this.appointmentsService.getAll().pipe(
      map(appointments =>
        appointments.reduce((acc, appointment) => {
          const branch = appointment.branch || 'Unknown Branch';
          let group = acc.find(g => g.branch === branch);
          if (!group) {
            group = { branch, appointments: [] };
            acc.push(group);
          }
          group.appointments.push(appointment);
          return acc;
        }, [] as { branch: string; appointments: Appointment[] }[])
      )
    );
  }
}
