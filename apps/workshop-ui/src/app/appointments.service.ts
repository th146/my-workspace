import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Appointment, Branch } from '@my-workspace/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  constructor(private readonly httpClient: HttpClient) { }

  getAll(): Observable<Appointment[]> {
    return this.httpClient.get<Appointment[]>('my-workspace/appointments');
  }

  getById(id: number): Observable<Appointment> {
    return this.httpClient.get<Appointment>(`my-workspace/appointments/${id}`);
  }

  updateAppointment(id: number, appointment: Partial<Appointment>): Observable<Appointment> {
    return this.httpClient.patch<Appointment>(`my-workspace/appointments/${id}`, appointment);
  }


  deleteAppointment(id: number): Observable<void> {
    return this.httpClient.delete<void>(`my-workspace/appointments/${id}`);
  }


  getBranches(): Observable<Branch[]> {
    return this.httpClient.get<Branch[]>('my-workspace/branches');
  }

  createAppointment(appointmentData: Appointment): Observable<Appointment> {
    return this.httpClient.post<Appointment>('my-workspace/appointments/create-appointment', appointmentData);
  }

}