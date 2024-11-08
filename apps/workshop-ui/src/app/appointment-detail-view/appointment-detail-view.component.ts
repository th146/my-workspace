import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
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
      <!-- Form content remains the same -->
    </form>
  `,
  styles: [],
})
export class AppointmentDetailViewComponent implements OnInit {
  @Input() appointment!: Appointment;
  @Output() appointmentSave = new EventEmitter<Partial<Appointment>>();

  form!: FormGroup;  // Deklariere das Formular hier

  constructor(private readonly openingHoursValidatorService: OpeningHoursValidatorService) {}

  ngOnInit(): void {
    // Initialisiere das Formular hier
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

    // Falls es einen appointment Input gibt, patche die Werte ins Formular
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
}
