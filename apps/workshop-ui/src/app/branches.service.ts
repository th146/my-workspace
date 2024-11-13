import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Branch } from '@my-workspace/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class BranchesService {
  constructor(private readonly httpClient: HttpClient) {}

  // Methode zum Erstellen eines Standorts
  createBranch(branch: Branch): Observable<Branch> {
    return this.httpClient.post<Branch>('my-workspace/branches', branch);
  }

  // Methode zum Abrufen der Standorte
  getBranches(): Observable<Branch[]> {
    return this.httpClient.get<Branch[]>('my-workspace/branches');
  }
}
