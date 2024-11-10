import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';  // Falls du auch Reactive Forms nutzt
import { FormsModule } from '@angular/forms';  // Importiere FormsModule
import { RouterModule } from '@angular/router';

@Component({
  selector: 'workshop-create-appointments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],  // Füge FormsModule hier hinzu
  template: `
    <div class="create-appointment">
      <h2>Create Appointment</h2>
      <form (ngSubmit)="onSubmit()">
        <div>
          <label for="vehicleOwner">Owner</label>
          <input type="text" id="vehicleOwner" [(ngModel)]="appointment.vehicleOwner" name="vehicleOwner" required>
        </div>
        <div>
          <label for="date">Date</label>
          <input type="date" id="date" [(ngModel)]="appointment.date" name="date" required>
        </div>
        <div>
          <label for="time">Time</label>
          <input type="time" id="time" [(ngModel)]="appointment.time" name="time" required>
        </div>
        <div>
          <label for="vehicleRegNo">Vehicle Registration</label>
          <input type="text" id="vehicleRegNo" [(ngModel)]="appointment.vehicleRegNo" name="vehicleRegNo" required>
        </div>
        <div>
          <label for="branch">Branch</label>
          <select id="branch" [(ngModel)]="appointment.branch" name="branch" required>
            <option value="Dortmund">Dortmund</option>
            <option value="Berlin">Berlin</option>
          </select>
        </div>
        <div>
          <label for="status">Status</label>
          <select id="status" [(ngModel)]="appointment.status" name="status" required>
            <option value="Repair">Repair</option>
            <option value="Ready for Pickup">Ready for Pickup</option>
          </select>
        </div>
        <button type="submit">Create Appointment</button>
      </form>
    </div>
    <div class="mb-2">
          <a class="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline" [routerLink]="['..']">
              Back to list
          </a>
      </div>
  `,
  styleUrls: [],
})
export class CreateAppointmentsComponent {
  appointment = {
    vehicleOwner: '',
    date: '',
    time: '',
    vehicleRegNo: '',
    branch: '',
    status: '',
  };

  onSubmit() {
    console.log('Appointment submitted:', this.appointment);
  }
}
