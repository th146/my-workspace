import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
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
              (appointmentDelete)="deleteAppointment($event)"
              *ngIf="appointment$ | async as appointment">
      </workshop-appointment-detail-view>
  `,
  styles: [],
})
export class AppointmentDetailRouteComponent {
  appointment$!: Observable<Appointment>;
  actualId = -1;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly appointmentsService: AppointmentsService,
    private readonly router: Router // Inject the Router service
  ) { }

  ngOnInit(): void {
    this.appointment$ = this.activatedRoute.params.pipe(
      map(params => Number(params['id'])),
      tap(id => this.actualId = id),
      switchMap(id => this.appointmentsService.getById(id))
    );
  }

  async save(appointment: Partial<Appointment>) {
    await firstValueFrom(this.appointmentsService.updateAppointment(this.actualId, appointment));
  }

  deleteAppointment(id: number) {
    firstValueFrom(this.appointmentsService.deleteAppointment(id)).then(() => {
      console.log(`Appointment ${id} deleted`);
      // After deleting, navigate back to the appointment list
      this.router.navigate(['/appointments']); // Navigate to the list of appointments
    }).catch(error => {
      console.error('Error deleting appointment', error);
    });
  }
}
