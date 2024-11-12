import { Component, EventEmitter, Input, Output, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Appointment } from '@my-workspace/api-interfaces';
import { OpeningHoursValidatorService } from '../appointments/opening-hours-validator.service';
import { Location } from '@angular/common'; // Importiere das Location-Service

@Component({
  selector: 'workshop-appointment-detail-view',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="save()" class="form-container">
      <div class="form-section">
        <h3>Fahrzeuginformation</h3>
        <div class="form-group">
          <label>Owner</label>
          <input type="text" formControlName="vehicleOwner" class="input-field">
          <div class="error" *ngIf="form.controls['vehicleOwner'].invalid">Please provide an owner</div>
        </div>
        <div class="form-group">
          <label>Registration</label>
          <input type="text" formControlName="vehicleRegNo" class="input-field">
          <div class="error" *ngIf="form.controls['vehicleRegNo'].invalid">Please provide a registration number</div>
        </div>
      </div>

      <div class="form-section">
        <h3>Terminzeit und Ort</h3>
        <div class="form-group">
          <label>Date</label>
          <input type="date" formControlName="date" class="input-field">
          <div class="error" *ngIf="form.controls['date'].invalid">Please provide a valid date</div>
        </div>
        <div class="form-group">
          <label>Time</label>
          <input type="time" formControlName="time" class="input-field">
          <div class="error" *ngIf="form.controls['time'].invalid">Please provide a valid time</div>
        </div>
        <div class="form-group">
          <label>Branch</label>
          <select formControlName="branch" class="input-field">
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
          <label>Status</label>
          <select formControlName="status" class="input-field">
            <option value="repair">Repair</option>
            <option value="ready for pickup">Ready for pickup</option>
          </select>
        </div>
      </div>

      <div class="form-buttons">
        <button type="submit" [disabled]="form.invalid" class="btn-save">Save</button>
        <button type="button" (click)="deleteAppointment()" class="btn-delete">Delete</button>
      </div>
    </form>
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
      justify-content: center; /* Zentriert die Buttons horizontal */
    }
    .btn-save, .btn-delete {
      padding: 0.6rem 1.2rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      color: #ffffff;
    }
    .btn-save {
      background-color: #4f46e5;
    }
    .btn-save:hover {
      background-color: #6366f1;
    }
    .btn-delete {
      background-color: #f87171;
    }
    .btn-delete:hover {
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
export class AppointmentDetailViewComponent implements OnInit, OnChanges {
  @Input() appointment!: Appointment;
  @Output() appointmentSave = new EventEmitter<Partial<Appointment>>();
  @Output() appointmentDelete = new EventEmitter<number>();

  form!: FormGroup;

  constructor(
    private readonly openingHoursValidatorService: OpeningHoursValidatorService,
    private readonly location: Location // Injectiere das Location-Service
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      vehicleOwner: new FormControl('', { validators: Validators.required, nonNullable: true }),
      date: new FormControl('', { validators: Validators.required, nonNullable: true }),
      time: new FormControl('', { validators: Validators.required, nonNullable: true }),
      vehicleRegNo: new FormControl('', { validators: Validators.required, nonNullable: true }),
      branch: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
      status: new FormControl('', { nonNullable: true }),
    }, {
      asyncValidators: [this.openingHoursValidatorService.openingHoursValidator('time', 'branch')],
    });

    if (this.appointment) {
      this.form.patchValue(this.appointment);
    }
  }

  ngOnChanges(): void {
    if (this.appointment != null) {
      this.form.patchValue(this.appointment);
    }
  }

  save() {
    if (this.form.valid) {
      this.appointmentSave.emit(this.form.value);
      console.log('saving value', this.form.value);

      // Nach dem Speichern zur vorherigen Seite zurückkehren
      this.location.back();
    } else {
      console.log('Form is invalid');
    }
  }

  deleteAppointment() {
    if (this.appointment && this.appointment.id) {
      this.appointmentDelete.emit(this.appointment.id);
      // Nach dem Löschen zur vorherigen Seite zurückkehren
      this.location.back();
    }
  }
}
