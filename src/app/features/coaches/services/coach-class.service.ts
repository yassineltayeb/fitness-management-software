import { CoachClassResponse } from './../models/coach-class-response.model';
import { PagedResult } from './../../../shared/models/paged-result.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CoachClassRequest } from '../models/coach-class-request.model';
import { CoachClassStatus } from 'src/app/core/enums/coach-class-status.enum';

@Injectable(
  {
    providedIn: 'root'
  })
export class CoachClassService {
  private baseUrl: string = environment.baseUrl + 'coaches/classes';

  constructor(private http: HttpClient) { }

  getCoachesClasses(searchTerm: string, pageNumber: number, pageSize: number): Observable<PagedResult<CoachClassResponse>> {
    let queryParams = new HttpParams();

    queryParams = queryParams.append('searchTerm', searchTerm);
    if (pageNumber) {
      queryParams = queryParams.append('pageNumber', pageNumber)
    };
    if (pageSize) {
      queryParams = queryParams.append('pageSize', pageSize);
    }

    return this.http.get<PagedResult<CoachClassResponse>>(this.baseUrl, {
      params: queryParams
    });
  }

  addCoachClass(coachClass: CoachClassRequest): Observable<CoachClassResponse> {
    return this.http.post<CoachClassResponse>(this.baseUrl, coachClass);
  }

  getCoachClassById(coachClassId: number): Observable<CoachClassResponse> {
    return this.http.get<CoachClassResponse>(this.baseUrl + '/' + coachClassId);
  }

  updateCoachClass(coachClassId: number, coachClass: CoachClassRequest): Observable<CoachClassResponse> {
    return this.http.put<CoachClassResponse>(this.baseUrl + '/' + coachClassId, coachClass);
  }

  /* ---------------------------- Status Functions ---------------------------- */
  getCoachClassStatusById(statusId: number): string {
    switch (statusId) {
      case CoachClassStatus.Booking:
        return 'Booking';
      case CoachClassStatus.OnProgress:
        return 'On Progress';
      case CoachClassStatus.Finished:
        return 'Finished';
      case CoachClassStatus.Canceled:
        return 'Canceled';
    }

    return 'N/A';
  }

  getCoachClassStatusColor(statusId: number): string {
    switch (statusId) {
      case CoachClassStatus.Booking:
        return 'text-bg-primary';
      case CoachClassStatus.OnProgress:
        return 'text-bg-info';
      case CoachClassStatus.Finished:
        return 'text-bg-success';
      case CoachClassStatus.Canceled:
        return 'text-bg-danger';
    }

    return 'text-bg-secondary';
  }
}
