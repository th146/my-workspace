import { Component, EventEmitter, Input, Output, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Appointment, Branch } from '@my-workspace/api-interfaces';
import { OpeningHoursValidatorService } from '../appointments/opening-hours-validator.service';
import { Location } from '@angular/common';
import { BranchesService } from '../branches.service';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'workshop-appointment-detail-view',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="save()" class="form-container">
  <div class="form-section">
    <h3>Vehicle Information</h3>
    <div class="form-group">
      <label>Owner</label>
      <input type="text" formControlName="vehicleOwner" class="input-field" [disabled]="!isEditable">
      <div class="error" *ngIf="form.controls['vehicleOwner'].invalid && isEditable">Please provide an owner</div>
    </div>
    <div class="form-group">
      <label>Registration</label>
      <input type="text" formControlName="vehicleRegNo" class="input-field" [disabled]="!isEditable">
      <div class="error" *ngIf="form.controls['vehicleRegNo'].invalid && isEditable">Please provide a registration number</div>
    </div>
  </div>

  <div class="form-section">
    <h3>Date and Time</h3>
    <div class="form-group">
      <label>Date</label>
      <input type="date" formControlName="date" class="input-field" [disabled]="!isEditable">
      <div class="error" *ngIf="form.controls['date'].invalid && isEditable">Please provide a valid date</div>
    </div>
    <div class="form-group">
      <label>Time</label>
      <input type="time" formControlName="time" class="input-field" [disabled]="!isEditable">
      <div class="error" *ngIf="form.controls['time'].invalid && isEditable">Please provide a valid time</div>
    </div>
    <div class="form-group">
      <label>Branch</label>
      <select formControlName="branch" class="input-field" [disabled]="!isEditable">
        <option *ngFor="let branch of branches" [value]="branch.name">{{ branch.name }}</option>
      </select>
      <div class="error" *ngIf="form.controls['branch'].invalid && isEditable">Please select a branch</div>
      <div class="error" *ngIf="form.hasError('openingHours') && isEditable">{{ form.getError('openingHours') }}</div>
    </div>
  </div>

  <div class="form-section">
    <h3>Status</h3>
    <div class="form-group">
      <label>Status</label>
      <select formControlName="status" class="input-field" [disabled]="!isEditable">
        <option value="repair">Repair</option>
        <option value="ready for pickup">Ready for pickup</option>
      </select>
    </div>
  </div>

  <!-- Buttons -->
  <div class="form-buttons">
    <button *ngIf="isEditable" type="submit" [disabled]="form.invalid" class="btn-save">Save</button>
    <button *ngIf="isAdmin && isEditable" (click)="deleteAppointment()" class="btn-delete">Delete</button>
    <a class="btn-back" (click)="goBack()">Back to list</a>
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
    .btn-delete {
      padding: 0.6rem 1.2rem;
      background-color: #f87171;
      color: #ffffff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .btn-delete:hover {
      background-color: #fb7185;
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
  `]
})
export class AppointmentDetailViewComponent implements OnInit, OnChanges {
  @Input() appointment!: Appointment;
  @Output() appointmentSave = new EventEmitter<Partial<Appointment>>();
  @Output() appointmentDelete = new EventEmitter<number>();
  isAdmin = false;
  isUser = false;
  isEditable = false;

  form!: FormGroup;
  branches: Branch[] = [];  // Array für die Standorte

  constructor(
    private readonly openingHoursValidatorService: OpeningHoursValidatorService,
    private readonly location: Location,
    private readonly branchesService: BranchesService,
    private readonly authService: AuthService,
  ) {}

  ngOnInit(): void {

    const role = this.authService.getRoleFromToken();
    this.isAdmin = role === 'admin';  // Setze das isAdmin-Flag auf true, wenn der Benutzer ein Admin ist
    this.isUser = role === 'user';  // Setze das isUser-Flag auf true, wenn der Benutzer ein User ist

    if (this.isAdmin || (this.appointment && this.appointment.appointmentsOwner === this.authService.getUsernameFromToken())) {
      this.isEditable = true;
    }

    // Formularinitialisierung
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

    // Deaktivieren der FormControls, wenn isEditable = false
    if (!this.isEditable) {
      this.form.disable();
    }

    // Lade die Standorte
    this.branchesService.getBranches().subscribe((branches: Branch[]) => {
      this.branches = branches;  // Setze die Standorte im lokalen Array
    });
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

  goBack() {
    this.location.back(); // Zurück zur vorherigen Seite
  }
}
