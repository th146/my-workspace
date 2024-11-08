import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Appointment } from '@my-workspace/api-interfaces';
import { Observable, map, tap, switchMap, firstValueFrom } from 'rxjs';
import { AppointmentDetailViewComponent } from '../appointment-detail-view/appointment-detail-view.component';
import { AppointmentsService } from '../appointments.service';

@Component({
  selector: 'workshop-appointment-detail-route',
  standalone: true,
  imports: [CommonModule, RouterLink, AppointmentDetailViewComponent],
  template: `
      <div class="mb-2">
          <a class="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline" [routerLink]="['..']">
              Back to list
          </a>
      </div>
      <workshop-appointment-detail-view
              [appointment]="appointment"
              (appointmentSave)="save($event)"
              *ngIf="appointment$ | async as appointment">
      </workshop-appointment-detail-view>
  `,
  styles: [],
})
export class AppointmentDetailRouteComponent {
  appointment$!: Observable<Appointment>
  actualId = -1;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly appointmentsService: AppointmentsService
  ) { }

  ngOnInit(): void {
    this.appointment$ = this.activatedRoute.params.pipe(
      map(params => Number(params['id'])),
      tap(id => this.actualId = id),
      switchMap(id => this.appointmentsService.getById(id))
    )
  }
  async save(appointment: Partial<Appointment>) {
    await firstValueFrom(this.appointmentsService.updateAppointment(this.actualId, appointment))
  }
}

