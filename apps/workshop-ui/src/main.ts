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
      { path: '', pathMatch: 'full', redirectTo: 'appointment' },
      { path: 'appointment', component: AppointmentListComponent },
      { path: 'appointment/:id', component: AppointmentDetailRouteComponent },
      { path: 'login', component: LoginComponent },
    ]),
    importProvidersFrom(HttpClientModule)
  ]
}).catch((err) => console.error(err));