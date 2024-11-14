import { AppointmentDetailRouteComponent } from './app/appointment-detail-route/appointment-detail-route.component';
import { CreateAppointmentsComponent } from './app/appointments-create/create-appointments.component';
import { HttpClientModule } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { LoginComponent } from './app/login/login.component';
import { AppointmentListComponent } from './app/appointment-list/appointment-list.component';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { AuthGuard } from './app/auth/auth.guard';
import { CreateBranchComponent } from "./app/branches/create-branch.component";
import { BranchesViewComponent } from "./app/branches/branches-view-component";
import { BranchDetailRouteComponent } from "./app/branches/branches-detail-view-route-component"


bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', pathMatch: 'full', redirectTo: 'users/login' },
      { path: 'appointments', component: AppointmentListComponent, canActivate: [AuthGuard] },
      { path: 'users/login', component: LoginComponent },
      { path: 'appointments/:id', component: AppointmentDetailRouteComponent, canActivate: [AuthGuard] }, // Detailansicht
      { path: 'create-appointment', component: CreateAppointmentsComponent, canActivate: [AuthGuard] },
      { path: 'branches', component: BranchesViewComponent, canActivate: [AuthGuard] }, // Hauptansicht für Branches
      { path: 'create-branch', component: CreateBranchComponent, canActivate: [AuthGuard] }, // Erstellen eines neuen Standorts
      { path: 'branches/:id', component: BranchDetailRouteComponent, canActivate: [AuthGuard]},
    ]),
    importProvidersFrom(HttpClientModule)
  ]
}).catch((err) => console.error(err));
