import { CoachClassResponse } from './../models/coach-class-response.model';
import { PagedResult } from './../../../shared/models/paged-result.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CoachClassRequest } from '../models/coach-class-request.model';

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

}
