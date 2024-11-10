import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Appointment } from '@my-workspace/api-interfaces';
import { Observable } from 'rxjs';
import { AppointmentsService } from '../appointments.service';

@Component({
  selector: 'workshop-appointment-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
      <ul class="list-disc">
          <li *ngFor="let appointment of appointments$ | async">
              <a class="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
                 [routerLink]="[appointment.id]">{{appointment.vehicleOwner}} - {{appointment.vehicleRegNo}}</a>

          </li>
            <button routerLink="/appointments/create-appointment" class="btn btn-primary">
            Create Appointment
            </button>
      </ul> `,
  styles: [],
})
export class AppointmentListComponent implements OnInit {
  appointments$!: Observable<Appointment[]>;

  constructor(private readonly appointmentsService: AppointmentsService) { }

  ngOnInit(): void {
    this.appointments$ = this.appointmentsService.getAll();
  }

  
}
