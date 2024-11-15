import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CreateAppointmentsComponent } from './create-appointments.component';
import { AppointmentsService } from '../appointments.service';
import { Appointment } from '@my-workspace/api-interfaces';

@Component({
  selector: 'workshop-create-appointment-route',
  standalone: true,
  imports: [CommonModule, RouterLink, CreateAppointmentsComponent],
  template: `
    <div class="mb-2">
      <a class="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline" [routerLink]="['..']">
        Back to list
      </a>
    </div>
    <workshop-create-appointments (appointmentCreated)="createAppointment($event)"></workshop-create-appointments>
  `,
  styles: [],
})
export class CreateAppointmentRouteComponent {
  constructor(
    private readonly appointmentsService: AppointmentsService
  ) {}

  createAppointment(appointment: Partial<Appointment>) {
    this.appointmentsService.createAppointment(appointment).subscribe({
      next: (createdAppointment) => {
        console.log('Termin erstellt:', createdAppointment);
      },
      error: (err) => {
        console.error('Fehler beim Erstellen des Termins:', err);
      }
    });
  }
}
