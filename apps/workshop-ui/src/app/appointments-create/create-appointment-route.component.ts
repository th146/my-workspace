import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Appointment } from '@my-workspace/api-interfaces';
import { AppointmentsService } from '../appointments.service';
import { firstValueFrom, Observable } from 'rxjs';
import { CreateAppointmentsComponent } from './create-appointments.component';

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
    <workshop-create-appointments
      (appointmentCreated)="createAppointment($event)">
    </workshop-create-appointments>
  `,
  styles: [],
})
export class CreateAppointmentRouteComponent implements OnInit {
  constructor(
    private appointmentsService: AppointmentsService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // Methode zum Erstellen eines Termins
  handleAppointmentCreated(appointment: Partial<Appointment>) {
    this.appointmentsService.createAppointment(appointment).subscribe(
      (response: Appointment) => {
        console.log('Termin erfolgreich erstellt:', response);
        // Weiterleitung zur Startseite nach erfolgreicher Erstellung
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Fehler beim Erstellen des Termins:', error);
      }
    );
  }
  
}