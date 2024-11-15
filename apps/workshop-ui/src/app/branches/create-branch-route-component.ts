import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CreateBranchComponent } from './create-branch.component';
import { BranchesService } from '../branches.service';
import { Branch } from '@my-workspace/api-interfaces';

@Component({
  selector: 'workshop-create-branch-route',
  standalone: true,
  imports: [CommonModule, RouterLink, CreateBranchComponent],
  template: `
    <div class="mb-2">
      <a class="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline" [routerLink]="['..']">
        Back to list
      </a>
    </div>
    <workshop-create-branch (branchCreated)="createBranch($event)"></workshop-create-branch>
  `,
  styles: [],
})
export class CreateBranchRouteComponent {
  constructor(
    private readonly branchesService: BranchesService
  ) { }

  createBranch(branch: Branch) {
    this.branchesService.createBranch(branch).subscribe({
      next: (createdBranch) => {
        console.log('Branch created:', createdBranch);

      },
      error: (err) => {
        console.error('Error creating branch:', err);
      }
    });
  }
}
