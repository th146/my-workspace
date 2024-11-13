import { AppointmentDetailViewComponent } from './app/appointment-detail-view/appointment-detail-view.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppointmentListComponent } from "./app/appointment-list/appointment-list.component";
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AppointmentDetailRouteComponent } from "./app/appointment-detail-route/appointment-detail-route.component";
import { CreateAppointmentsComponent } from "./app/appointments-create/create-appointments.component";
import { CreateBranchComponent } from "./app/branches/create-branch.component";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', pathMatch: 'full', redirectTo: 'appointments' },
      { path: 'appointments', component: AppointmentListComponent },
      { path: 'appointments/create-appointment', component: CreateAppointmentsComponent },
      { path: 'appointments/:id', component: AppointmentDetailRouteComponent },
      { path: 'branches', component: CreateBranchComponent }, 
    ]),
    importProvidersFrom(HttpClientModule)
  ] 
}).catch((err) => console.error(err));
