import { CreateAppointmentRouteComponent } from './app/appointments-create/create-appointment-route.component';
import { CreateAppointmentsComponent } from './app/appointments-create/create-appointments.component';
import { LoginComponent } from './app/login/login.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from "@angular/router";
import { importProvidersFrom } from "@angular/core";
import { AppointmentListComponent } from "./app/appointment-list/appointment-list.component";
import { HttpClientModule } from "@angular/common/http";
import { AppointmentDetailRouteComponent } from "./app/appointment-detail-route/appointment-detail-route.component";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
      { path: 'appointments', component: AppointmentListComponent },
      { path: 'appointments/:id', component: AppointmentDetailRouteComponent },
      { path: 'appointments/create-appointment', component: CreateAppointmentRouteComponent },
      { path: 'auth/login', component: LoginComponent },
    ]),
    importProvidersFrom(HttpClientModule)
  ]
}).catch((err) => console.error(err));