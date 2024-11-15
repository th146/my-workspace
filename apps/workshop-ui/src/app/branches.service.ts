import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Branch } from '@my-workspace/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class BranchesService {
  constructor(private readonly httpClient: HttpClient) { }


  createBranch(branch: Branch): Observable<Branch> {
    return this.httpClient.post<Branch>('my-workspace/branches', branch);
  }


  getBranches(): Observable<Branch[]> {
    return this.httpClient.get<Branch[]>('my-workspace/branches');
  }


  getById(id: number): Observable<Branch> {
    return this.httpClient.get<Branch>(`my-workspace/branches/${id}`);
  }


  updateBranch(id: number, branch: Partial<Branch>): Observable<Branch> {
    return this.httpClient.patch<Branch>(`my-workspace/branches/${id}`, branch);
  }


  deleteBranch(id: number): Observable<void> {
    return this.httpClient.delete<void>(`my-workspace/branches/${id}`);
  }
}
