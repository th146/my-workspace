import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Appointment, OpeningHoursPerBranch } from "@my-workspace/api-interfaces";

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  openingHoursPerBranch: OpeningHoursPerBranch = {
    Berlin: {
      openingHoursStart: '08:00',
      openingHoursEnd: '16:00',
    },
    Dortmund: {
      openingHoursStart: '07:00',
      openingHoursEnd: '20:00',
    },
  }

  constructor(private readonly httpClient: HttpClient) {
  }

  getAll(): Observable<Appointment[]> {
    return this.httpClient.get<Appointment[]>('my-workspace/appointments');
  }

  getById(id: number): Observable<Appointment> {
    return this.httpClient.get<Appointment>(`my-workspace/appointments/${id}`);
  }

  updateAppointment(id: number, appointment: Partial<Appointment>): Observable<Appointment> {
    return this.httpClient.patch<Appointment>(`my-workspace/appointments/${id}`, appointment);
  }

  getOpeningHoursPerBranch(): Observable<OpeningHoursPerBranch> {
    return of(this.openingHoursPerBranch);
  }
}
