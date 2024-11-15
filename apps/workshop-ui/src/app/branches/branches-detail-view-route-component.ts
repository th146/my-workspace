import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, map, Observable, switchMap, tap } from 'rxjs';
import { Branch } from '@my-workspace/api-interfaces';
import { BranchesService } from '../branches.service';
import { BranchDetailViewComponent } from './branches-detail-view-component';

@Component({
  selector: 'workshop-branch-detail-route',
  standalone: true,
  imports: [CommonModule, RouterLink, BranchDetailViewComponent],
  template: `
    <workshop-branch-detail-view
      [branch]="branch"
      (branchSave)="save($event)"
      (branchDelete)="deleteBranch($event)"
      *ngIf="branch$ | async as branch">
    </workshop-branch-detail-view>
  `,
  styles: [`
    .back-button-container {
      display: flex;
      justify-content: center;
      margin-bottom: 1.5rem;
    }
    .back-button {
      padding: 0.5rem 1rem;
      font-size: 1rem;
      color: #ffffff;
      background-color: #4f46e5;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      text-decoration: none;
      font-weight: 500;
    }
    .back-button:hover {
      background-color: #6366f1;
    }
  `],
})
export class BranchDetailRouteComponent {
  branch$!: Observable<Branch>;
  actualId = -1;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly branchesService: BranchesService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.branch$ = this.activatedRoute.params.pipe(
      map(params => Number(params['id'])),
      tap(id => this.actualId = id),
      switchMap(id => this.branchesService.getById(id))
    );
  }

  async save(branch: Partial<Branch>) {
    await firstValueFrom(this.branchesService.updateBranch(this.actualId, branch));
  }

  deleteBranch(id: number) {
    firstValueFrom(this.branchesService.deleteBranch(id)).then(() => {
        console.log(`Branch ${id} deleted`);
        this.router.navigate(['/branches']);
    }).catch(error => {
        console.error('Error deleting branch', error);
      });
    }
  }
