import { Component, EventEmitter, Input, Output, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Appointment } from '@my-workspace/api-interfaces';
import { OpeningHoursValidatorService } from '../appointments/opening-hours-validator.service';

@Component({
  selector: 'workshop-appointment-detail-view',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="save()" class="grid gap-2 w-full">
      <div class="flex flex-wrap">
        <label class="w-1/3 block">Owner</label>
        <input class="dark:bg-slate-900 w-2/3" type="text" formControlName="vehicleOwner">
        <div class="w-full error" *ngIf="form.controls['vehicleOwner'].invalid">Please provide an owner</div>
      </div>
      <div class="flex flex-wrap">
        <label class="w-1/3 block">Date</label>
        <input class="dark:bg-slate-900 w-2/3" type="date" formControlName="date">
        <div class="w-full error" *ngIf="form.controls['date'].invalid">Please provide a valid date</div>
      </div>
      <div class="flex flex-wrap">
        <label class="w-1/3 block">Time</label>
        <input class="dark:bg-slate-900 w-2/3" type="time" formControlName="time">
        <div class="w-full error" *ngIf="form.controls['time'].invalid">Please provide a valid time</div>
      </div>
      <div class="flex flex-wrap">
        <label class="w-1/3 block">Registration</label>
        <input class="dark:bg-slate-900 w-2/3" type="text" formControlName="vehicleRegNo">
        <div class="w-full error" *ngIf="form.controls['vehicleRegNo'].invalid">Please provide a registration number</div>
      </div>
      <div class="flex flex-wrap">
        <label class="w-1/3 block">Branch</label>
        <select class="dark:bg-slate-900 w-2/3" formControlName="branch">
          <option value="Dortmund">Dortmund</option>
          <option value="Berlin">Berlin</option>
        </select>
        <div class="w-full error" *ngIf="form.controls['branch'].invalid">Please select a branch</div>
        <div class="w-full error" *ngIf="form.hasError('openingHours')">{{ form.getError('openingHours') }}</div>
      </div>
      <div class="flex flex-wrap">
        <label class="w-1/3 block">Status</label>
        <select class="dark:bg-slate-900 w-2/3" formControlName="status">
          <option value="Reperatur">repair</option>
          <option value="Abholung">ready for pickup</option>
        </select>
      </div>
      <div>
        <button type="submit" [disabled]="form.invalid" class="bg-indigo-400 hover:bg-indigo-300 dark:bg-indigo-700 px-2 py-1 dark:hover:bg-indigo-600 rounded">
          save
        </button>
        <button type="button" (click)="deleteAppointment()" class="bg-red-400 hover:bg-red-300 dark:bg-red-700 px-2 py-1 dark:hover:bg-red-600 rounded">
          Delete
        </button>
      </div>
    </form>
  `,
  styles: [],
})
export class AppointmentDetailViewComponent implements OnInit, OnChanges {
  @Input() appointment!: Appointment;
  @Output() appointmentSave = new EventEmitter<Partial<Appointment>>();
  @Output() appointmentDelete = new EventEmitter<number>(); // New EventEmitter for Delete action

  form!: FormGroup; // Declare the form here

  constructor(private readonly openingHoursValidatorService: OpeningHoursValidatorService) {}

  ngOnInit(): void {
    // Initialize the form here
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

    // If there is an appointment input, patch the values into the form
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
    } else {
      console.log('Form is invalid');
    }
  }

  deleteAppointment() {
    if (this.appointment && this.appointment.id) {
      this.appointmentDelete.emit(this.appointment.id);
    }
  }
}
