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
    <workshop-appointment-detail-view
      [appointment]="appointment"
      (appointmentSave)="save($event)"
      (appointmentDelete)="deleteAppointment($event)"
      *ngIf="appointment$ | async as appointment">
    </workshop-appointment-detail-view>
  `,
  styles: [`
    .back-button-container {
      display: flex;
      justify-content: center;
      margin-bottom: 1.5rem;
    }
    .back-button {
      padding: 0.5rem 1rem;
      font-size: 1rem;
      color: #ffffff;
      background-color: #4f46e5;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      text-decoration: none;
      font-weight: 500;
    }
    .back-button:hover {
      background-color: #6366f1;
    }
  `],
})
export class AppointmentDetailRouteComponent {
  appointment$!: Observable<Appointment>;
  actualId = -1;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly appointmentsService: AppointmentsService,
    private readonly router: Router
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
      this.router.navigate(['/appointments']);
    }).catch(error => {
      console.error('Error deleting appointment', error);
    });
  }
}
