import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { OpeningHoursValidatorService } from '../appointments/opening-hours-validator.service';
import { Appointment } from '@my-workspace/api-interfaces';
import { RouterModule } from '@angular/router';
import { AppointmentsService } from '../appointments.service';
import { Location } from '@angular/common';

@Component({
  selector: 'workshop-create-appointments',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  template: `
    <div class="form-container">
      <h2>Create Appointment</h2>
      <form [formGroup]="form" (ngSubmit)="createAppointmentSubmit()">
        
        <div class="form-section">
          <h3>Fahrzeuginformation</h3>
          <div class="form-group">
            <label for="vehicleOwner">Owner</label>
            <input type="text" id="vehicleOwner" formControlName="vehicleOwner" class="input-field">
            <div class="error" *ngIf="form.controls['vehicleOwner'].invalid">Please provide an owner</div>
          </div>
          <div class="form-group">
            <label for="vehicleRegNo">Vehicle Registration</label>
            <input type="text" id="vehicleRegNo" formControlName="vehicleRegNo" class="input-field">
            <div class="error" *ngIf="form.controls['vehicleRegNo'].invalid">Please provide a registration number</div>
          </div>
        </div>

        <div class="form-section">
          <h3>Terminzeit und Ort</h3>
          <div class="form-group">
            <label for="date">Date</label>
            <input type="date" id="date" formControlName="date" class="input-field">
            <div class="error" *ngIf="form.controls['date'].invalid">Please provide a valid date</div>
          </div>
          <div class="form-group">
            <label for="time">Time</label>
            <input type="time" id="time" formControlName="time" class="input-field">
            <div class="error" *ngIf="form.controls['time'].invalid">Please provide a valid time</div>
          </div>
          <div class="form-group">
            <label for="branch">Branch</label>
            <select id="branch" formControlName="branch" class="input-field">
              <option value="Dortmund">Dortmund</option>
              <option value="Berlin">Berlin</option>
            </select>
            <div class="error" *ngIf="form.controls['branch'].invalid">Please select a branch</div>
            <div class="error" *ngIf="form.hasError('openingHours')">{{ form.getError('openingHours') }}</div>
          </div>
        </div>

        <div class="form-section">
          <h3>Status</h3>
          <div class="form-group">
            <label for="status">Status</label>
            <select id="status" formControlName="status" class="input-field">
              <option value="">Select Status</option>
              <option value="repair">Repair</option>
              <option value="ready for pickup">Ready for pickup</option>
            </select>
          </div>
        </div>

        <div class="form-buttons">
          <button type="submit" [disabled]="form.invalid" class="btn-save">Create Appointment</button>
          <a class="btn-back" (click)="goBack()">Back to list</a>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .form-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-width: 600px;
      margin: auto;
      padding: 2rem;
      border-radius: 8px;
      background-color: #f7f9fc;
    }
    .form-section {
      padding: 1rem;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      background-color: #ffffff;
    }
    h2, h3 {
      color: #1f2937;
    }
    h2 {
      font-size: 1.5rem;
      text-align: center;
    }
    h3 {
      margin-bottom: 0.5rem;
      font-size: 1.2rem;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
    }
    label {
      font-weight: bold;
      margin-bottom: 0.3rem;
      color: #4b5563;
    }
    .input-field {
      padding: 0.5rem;
      border: 1px solid #cbd5e0;
      border-radius: 4px;
      font-size: 1rem;
    }
    .input-field:focus {
      outline: none;
      border-color: #6366f1;
      box-shadow: 0 0 5px rgba(99, 102, 241, 0.3);
    }
    .error {
      color: #f87171;
      font-size: 0.85rem;
      margin-top: 0.3rem;
    }
    .form-buttons {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
      justify-content: center;
    }
    .btn-save {
      padding: 0.6rem 1.2rem;
      background-color: #4f46e5;
      color: #ffffff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .btn-save:hover {
      background-color: #6366f1;
    }
    .btn-back {
      padding: 0.6rem 1.2rem;
      background-color: #6b7280;
      color: #ffffff;
      text-align: center;
      border-radius: 4px;
      text-decoration: none;
    }
    .btn-back:hover {
      background-color: #9ca3af;
    }
    @media (max-width: 600px) {
      .form-container {
        padding: 1rem;
      }
      .input-field {
        font-size: 0.9rem;
      }
      h2, h3 {
        font-size: 1.1rem;
      }
    }
  `],
})
export class CreateAppointmentsComponent implements OnInit {
  @Output() appointmentCreated = new EventEmitter<Partial<Appointment>>();

  form!: FormGroup;

  constructor(
    private readonly openingHoursValidatorService: OpeningHoursValidatorService,
    private readonly appointmentsService: AppointmentsService,
    private readonly location: Location // Injection des Location Services
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      vehicleOwner: new FormControl('', { validators: Validators.required, nonNullable: true }),
      date: new FormControl('', { validators: Validators.required, nonNullable: true }),
      time: new FormControl('', { validators: Validators.required, nonNullable: true }),
      vehicleRegNo: new FormControl('', { validators: Validators.required, nonNullable: true }),
      branch: new FormControl('', { validators: Validators.required, nonNullable: true }),
      status: new FormControl('', { nonNullable: true }),
    }, {
      asyncValidators: [this.openingHoursValidatorService.openingHoursValidator('time', 'branch')]
    });
  }

  createAppointmentSubmit() {
    if (this.form.valid) {
      const appointmentToSend: Appointment = {
        ...this.form.value,
        branch: this.form.value.branch ?? '',
        status: this.form.value.status ?? '',
        assignment: this.form.value.assignment ?? 'No Assignment',
      };

      this.appointmentsService.createAppointment(appointmentToSend).subscribe({
        next: (createdAppointment) => {
          console.log('Appointment created:', createdAppointment);
          this.appointmentCreated.emit(createdAppointment);
          this.form.reset();
          this.location.back(); // Zurück zur vorherigen Seite
        },
        error: (err) => {
          console.error('Error creating appointment:', err);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

  goBack() {
    this.location.back(); // Zurück zur vorherigen Seite, wenn der "Back" Button geklickt wird
  }
}
