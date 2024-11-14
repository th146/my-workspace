import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Branch } from '@my-workspace/api-interfaces';
import { BranchesService } from '../branches.service';

@Component({
  selector: 'workshop-branches-view',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="form-container">
      <h2>Branches</h2>

      <div class="branches-row">
        <div *ngFor="let branch of branches" class="branch-card">
          <a [routerLink]="['/branches', branch.id]" class="branch-link">
            <h3>{{ branch.name }}</h3>
            <p><strong>Opening Hours:</strong></p>
            <p>{{ branch.openingHoursStart }} - {{ branch.openingHoursEnd }}</p>
          </a>
        </div>
      </div>

      <div class="form-buttons">
        <button (click)="navigateToCreateBranch()" class="btn-save">
          Create New Branch
        </button>
        <button (click)="navigateToAppointmentsList()" class="btn-back">
          Back to Appointments
        </button>
      </div>
    </div>
  `,
  styles: [`
    .form-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      max-width: 800px;
      margin: auto;
      padding: 2rem;
      border-radius: 8px;
      background-color: #f7f9fc;
    }

    .branches-row {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: center;
    }

    .branch-card {
      flex: 1 1 200px;
      max-width: 200px;
      padding: 1rem;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      background-color: #ffffff;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .branch-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    }

    .branch-link {
      text-decoration: none;
      color: #1f2937;
    }

    h3 {
      margin-bottom: 0.5rem;
      font-size: 1.2rem;
      color: #1f2937;
    }

    .form-buttons {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
      justify-content: center;
    }

    .btn-save, .btn-back {
      padding: 0.6rem 1.2rem;
      background-color: #4f46e5;
      color: #ffffff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .btn-save:hover, .btn-back:hover {
      background-color: #6366f1;
    }

    @media (max-width: 600px) {
      .form-container {
        padding: 1rem;
      }
      h2, h3 {
        font-size: 1.1rem;
      }
    }
  `]
})
export class BranchesViewComponent implements OnInit {
  branches: Branch[] = [];

  constructor(
    private readonly branchesService: BranchesService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.branchesService.getBranches().subscribe({
      next: (branches) => {
        this.branches = branches;
      },
      error: (err) => console.error('Error loading branches:', err),
    });
  }

  navigateToCreateBranch(): void {
    this.router.navigate(['/create-branch']);
  }

  navigateToAppointmentsList(): void {
    this.router.navigate(['/appointments']);
  }
}
