import { AppointmentDetailRouteComponent } from './app/appointment-detail-route/appointment-detail-route.component';
import { CreateAppointmentRouteComponent } from './app/appointments-create/create-appointment-route.component';
import { CreateAppointmentsComponent } from './app/appointments-create/create-appointments.component';
import { HttpClientModule } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { LoginComponent } from './app/login/login.component';
import { AppointmentListComponent } from './app/appointment-list/appointment-list.component';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { AuthGuard } from './app/auth/auth.guard';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', pathMatch: 'full', redirectTo: 'users/login' },
      { path: 'appointments', component: AppointmentListComponent, canActivate: [AuthGuard] },
      { path: 'users/login', component: LoginComponent },
      { path: 'appointments/:id', component: AppointmentDetailRouteComponent, canActivate: [AuthGuard] },  // Detailansicht
      { path: 'appointments/create', component: CreateAppointmentRouteComponent, canActivate: [AuthGuard] },  // Neuer Termin
      { path: 'users/login', component: LoginComponent },
    ]),
    importProvidersFrom(HttpClientModule)
  ]
}).catch((err) => console.error(err));
