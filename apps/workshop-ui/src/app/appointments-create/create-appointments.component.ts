import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { OpeningHoursValidatorService } from '../appointments/opening-hours-validator.service';
import { Appointment, Branch } from '@my-workspace/api-interfaces';
import { RouterModule } from '@angular/router';
import { AppointmentsService } from '../appointments.service';
import { Location } from '@angular/common';
import { BranchesService } from '../branches.service';
import { AuthService } from '../auth/auth.service';

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
            <div class="error" *ngIf="isFieldInvalid('vehicleOwner')">
              Please provide an owner
            </div>
          </div>
          <div class="form-group">
            <label for="vehicleRegNo">Vehicle Registration</label>
            <input type="text" id="vehicleRegNo" formControlName="vehicleRegNo" class="input-field">
            <div class="error" *ngIf="isFieldInvalid('vehicleRegNo')">
              Please provide a registration number
            </div>
          </div>
        </div>

        <div class="form-section">
          <h3>Terminzeit und Ort</h3>
          <div class="form-group">
            <label for="date">Date</label>
            <input type="date" id="date" formControlName="date" class="input-field">
            <div class="error" *ngIf="isFieldInvalid('date')">
              Please provide a valid date
            </div>
          </div>
          <div class="form-group">
            <label for="time">Time</label>
            <input type="time" id="time" formControlName="time" class="input-field">
            <div class="error" *ngIf="isFieldInvalid('time')">
              Please provide a valid time
            </div>
          </div>
          <div class="form-group">
            <label for="branch">Branch</label>
            <select id="branch" formControlName="branch" class="input-field">
              <option *ngFor="let branch of branches" [value]="branch.name">{{ branch.name }}</option>
            </select>
            <div class="error" *ngIf="isFieldInvalid('branch')">
              Please select a branch
            </div>
            <div class="error" *ngIf="form.hasError('openingHours')">
              {{ form.getError('openingHours') }}
            </div>
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
          <button type="button" class="btn-back" (click)="goBack()">Back to list</button>
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
    h3 {
      margin-bottom: 0.5rem;
      font-size: 1.2rem;
      color: #1f2937;
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
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      color: #ffffff;
      background-color: #4f46e5;
    }
    .btn-save:hover {
      background-color: #6366f1;
    }
    .btn-save:disabled {
      background-color: #e5e7eb;
      cursor: not-allowed;
    }
    .btn-back {
      padding: 0.6rem 1.2rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      color: #ffffff;
      background-color: #f87171;
    }
    .btn-back:hover {
      background-color: #fb7185;
    }
    @media (max-width: 600px) {
      .form-container {
        padding: 1rem;
      }
      .input-field {
        font-size: 0.9rem;
      }
      h3 {
        font-size: 1rem;
      }
    }
  `],
})
export class CreateAppointmentsComponent implements OnInit {
  @Output() appointmentCreated = new EventEmitter<Partial<Appointment>>();

  form!: FormGroup;
  branches: Branch[] = [];
  formSubmitted = false; // Flag für das Anzeigen der Fehler bei der Formularüberprüfung

  constructor(
    private readonly openingHoursValidatorService: OpeningHoursValidatorService,
    private readonly appointmentsService: AppointmentsService,
    private readonly branchesService: BranchesService, 
    private readonly location: Location,
    private readonly authService: AuthService
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

    this.branchesService.getBranches().subscribe({
      next: (branches) => {
        this.branches = branches;
        this.form.updateValueAndValidity();
      },
      error: (err) => {
        console.error('Fehler beim Laden der Branches:', err);
      }
    });
  }

  createAppointmentSubmit() {
    this.formSubmitted = true; // Markiere das Formular als abgesendet
    if (this.form.valid) {
      const username = this.authService.getUsernameFromToken();
      const appointmentToSend: Appointment = {
        ...this.form.value,
        branch: this.form.value.branch ?? '',
        status: this.form.value.status ?? '',
        appointmentsOwner: username,
      };

      this.appointmentsService.createAppointment(appointmentToSend).subscribe({
        next: (createdAppointment) => {
          console.log('Appointment created:', createdAppointment);
          this.appointmentCreated.emit(createdAppointment);
          this.form.reset();
          this.formSubmitted = false; // Setze das Flag zurück
          this.location.back();
        },
        error: (error) => {
          console.error('Error creating appointment:', error);
        }
      });
    } else {
      console.error('Form is not valid');
    }
  }  

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!field && field.invalid && (field.touched || this.formSubmitted);
  }

  goBack() {
    this.location.back();
  }
}
