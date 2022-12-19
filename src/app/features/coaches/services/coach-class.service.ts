import { toLocalDate } from 'src/app/shared/helper/date.helper';
import { CoachClassResponse } from './../models/coach-class-response.model';
import { PagedResult } from './../../../shared/models/paged-result.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CoachClassRequest } from '../models/coach-class-request.model';
import { CoachClassStatus } from 'src/app/core/enums/coach-class-status.enum';
import { CoachClassStatusSummaryResponse } from '../models/coach-class-status-summary-response.model';

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
    }).pipe(
      map((coachClassResponse: PagedResult<CoachClassResponse>) => {
        coachClassResponse.data.forEach((coachClass: CoachClassResponse) => {
          coachClass.classDate = toLocalDate(coachClass.classDate);
        });
        return coachClassResponse;
      }));
  }

  addCoachClass(coachClass: CoachClassRequest): Observable<CoachClassResponse> {
    return this.http.post<CoachClassResponse>(this.baseUrl, coachClass).pipe(
      map((coachClassResponse: CoachClassResponse) => {
        coachClassResponse.classDate = toLocalDate(coachClassResponse.classDate);
        return coachClassResponse;
      }));
  }

  getCoachClassById(coachClassId: number): Observable<CoachClassResponse> {
    return this.http.get<CoachClassResponse>(this.baseUrl + '/' + coachClassId).pipe(
      map((coachClassResponse: CoachClassResponse) => {
        coachClassResponse.classDate = toLocalDate(coachClassResponse.classDate);
        return coachClassResponse;
      }));
  }

  updateCoachClass(coachClassId: number, coachClass: CoachClassRequest): Observable<CoachClassResponse> {
    return this.http.put<CoachClassResponse>(this.baseUrl + '/' + coachClassId, coachClass).pipe(
      map((coachClassResponse: CoachClassResponse) => {
        coachClassResponse.classDate = toLocalDate(coachClassResponse.classDate);
        return coachClassResponse;
      }));
  }

  updateCoachClassStatus(coachClassId: number, statusId: CoachClassStatus): Observable<CoachClassResponse> {
    return this.http.put<CoachClassResponse>(this.baseUrl + '/' + coachClassId + '/status/' + statusId, null).pipe(
      map((coachClassResponse: CoachClassResponse) => {
        coachClassResponse.classDate = toLocalDate(coachClassResponse.classDate);
        return coachClassResponse;
      }));
  }

  getCoachClassesStatusSummary(coachId: number): Observable<CoachClassStatusSummaryResponse> {
    return this.http.get<CoachClassStatusSummaryResponse>(this.baseUrl + '/' + coachId + '/statusSummary');
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
