import { CoachClassResponse } from './../models/coach-class-response.model';
import { PagedResult } from './../../../shared/models/paged-result.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

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
    queryParams = queryParams.append('pageNumber', pageNumber);
    queryParams = queryParams.append('pageSize', pageSize);

    return this.http.get<PagedResult<CoachClassResponse>>(this.baseUrl, {
      params: queryParams
    });
  }

}
