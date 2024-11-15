import { Component, EventEmitter, Input, Output, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Branch } from '@my-workspace/api-interfaces';
import { Location } from '@angular/common';
import { BranchesService } from '../branches.service';

@Component({
  selector: 'workshop-branch-detail-view',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="form-container">
      <h2>Branch Details</h2>
      <form [formGroup]="form" (ngSubmit)="save()" class="form-container">
        
        <!-- Branch Information Section -->
        <div class="form-section">
          <h3>Branch Information</h3>
          <div class="form-group">
            <label for="name">Branch Name</label>
            <input type="text" id="name" formControlName="name" class="input-field">
            <div class="error" *ngIf="form.controls['name'].invalid">Please provide a branch name</div>
          </div>
        </div>

        <!-- Opening Hours Section -->
        <div class="form-section">
          <h3>Opening Hours</h3>
          <div class="form-group">
            <label for="openingHoursStart">Opening Time</label>
            <input type="time" id="openingHoursStart" formControlName="openingHoursStart" class="input-field">
            <div class="error" *ngIf="form.controls['openingHoursStart'].invalid">Please provide a valid opening time</div>
          </div>
          <div class="form-group">
            <label for="openingHoursEnd">Closing Time</label>
            <input type="time" id="openingHoursEnd" formControlName="openingHoursEnd" class="input-field">
            <div class="error" *ngIf="form.controls['openingHoursEnd'].invalid">Please provide a valid closing time</div>
          </div>
        </div>

        <!-- Buttons -->
        <div class="form-buttons">
          <button type="submit" [disabled]="form.invalid" class="btn-save">Save</button>
          <button type="button" (click)="deleteBranch()" class="btn-delete">Delete</button>
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
export class BranchDetailViewComponent implements OnInit, OnChanges {
  @Input() branch!: Branch;
  @Output() branchSave = new EventEmitter<Partial<Branch>>();
  @Output() branchDelete = new EventEmitter<number>();

  form!: FormGroup;

  constructor(
    private readonly branchesService: BranchesService,
    private readonly location: Location
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', { validators: Validators.required, nonNullable: true }),
      openingHoursStart: new FormControl('', { validators: Validators.required, nonNullable: true }),
      openingHoursEnd: new FormControl('', { validators: Validators.required, nonNullable: true }),
    });

    if (this.branch) {
      this.form.patchValue(this.branch);
    }
  }

  ngOnChanges(): void {
    if (this.branch != null) {
      this.form.patchValue(this.branch);
    }
  }

  save() {
    if (this.form.valid) {
      this.branchSave.emit(this.form.value);
      console.log('Saving branch', this.form.value);

      // Nach dem Speichern zur vorherigen Seite zurückkehren
      this.location.back();
    } else {
      console.log('Form is invalid');
    }
  }

  deleteBranch() {
    if (this.branch && this.branch.id) {
      this.branchDelete.emit(this.branch.id);  // Hier wird nun die ID übergeben
      // Nach dem Löschen zur vorherigen Seite zurückkehren
      this.location.back();
    }
  }

  goBack() {
    this.location.back(); // Zurück zur vorherigen Seite
  }
}
