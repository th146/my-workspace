import { AppointmentDetailViewComponent } from './app/appointment-detail-view/appointment-detail-view.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http';
import { AppointmentListComponent } from "./app/appointment-list/appointment-list.component";
import { importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AppointmentDetailRouteComponent } from "./app/appointment-detail-route/appointment-detail-route.component";

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', pathMatch: 'full', redirectTo: 'appointments' },
      { path: 'appointments', component: AppointmentListComponent },
      { path: 'appointments/:id', component: AppointmentDetailRouteComponent },
    ]),
    importProvidersFrom(HttpClientModule)
  ] 
}).catch((err) => console.error(err));