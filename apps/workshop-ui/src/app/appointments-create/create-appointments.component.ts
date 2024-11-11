import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { OpeningHoursValidatorService } from '../appointments/opening-hours-validator.service';
import { Appointment } from '@my-workspace/api-interfaces';
import { RouterModule } from '@angular/router';
import { AppointmentsService } from '../appointments.service'; // Importieren des Services

@Component({
  selector: 'workshop-create-appointments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="create-appointment">
      <h2>Create Appointment</h2>
      <form [formGroup]="form" (ngSubmit)="createAppointmentSubmit()">
        <!-- Formularfelder -->
        <div>
          <label for="vehicleOwner">Owner</label>
          <input type="text" id="vehicleOwner" formControlName="vehicleOwner" required>
        </div>
        <div>
          <label for="date">Date</label>
          <input type="date" id="date" formControlName="date" required>
        </div>
        <div>
          <label for="time">Time</label>
          <input type="time" id="time" formControlName="time" required>
        </div>
        <div>
          <label for="vehicleRegNo">Vehicle Registration</label>
          <input type="text" id="vehicleRegNo" formControlName="vehicleRegNo" required>
        </div>
        <div>
          <label for="branch">Branch</label>
          <select id="branch" formControlName="branch" required>
            <option value="Dortmund">Dortmund</option>
            <option value="Berlin">Berlin</option>
          </select>
        </div>
        <div>
          <label for="status">Status</label>
          <select id="status" formControlName="status" required>
            <option value="Repair">Repair</option>
            <option value="Ready for Pickup">Ready for Pickup</option>
          </select>
        </div>
        <button type="submit" [disabled]="form.invalid">Create Appointment</button>
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
export class CreateAppointmentsComponent implements OnInit {
  @Output() appointmentCreated = new EventEmitter<Partial<Appointment>>();

  form!: FormGroup;

  constructor(private readonly openingHoursValidatorService: OpeningHoursValidatorService, private readonly appointmentsService: AppointmentsService) {}

  ngOnInit(): void {
    // Formular initialisieren
    this.form = new FormGroup({
      vehicleOwner: new FormControl('', { validators: Validators.required, nonNullable: true }),
      date: new FormControl('', { validators: Validators.required, nonNullable: true }),
      time: new FormControl('', { validators: Validators.required, nonNullable: true }),
      vehicleRegNo: new FormControl('', { validators: Validators.required, nonNullable: true }),
      branch: new FormControl('Dortmund', { validators: Validators.required, nonNullable: true }),
      status: new FormControl('Repair', { nonNullable: true }),
    }, {
      asyncValidators: [this.openingHoursValidatorService.openingHoursValidator('time', 'branch')]
    });
  }

  createAppointmentSubmit() {
    if (this.form.valid) {
      const appointmentToSend: Appointment = {
        ...this.form.value,
        branch: this.form.value.branch ?? 'Dortmund',
        assignment: this.form.value.assignment ?? 'No Assignment', // Optional: Default-Wert für `assignment`
      };

      // Termin an Service übergeben und HTTP-Anfrage auslösen
      this.appointmentsService.createAppointment(appointmentToSend).subscribe({
        next: (createdAppointment) => {
          console.log('Termin erstellt:', createdAppointment);
          this.appointmentCreated.emit(createdAppointment); // Bestätigung
          this.form.reset();
        },
        error: (err) => {
          console.error('Fehler beim Erstellen des Termins:', err);
        }
      });
    } else {
      console.log('Formular ist ungültig');
    }
  }
}
