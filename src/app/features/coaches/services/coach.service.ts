import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { CoachSignupRequest } from '../models/coach-signup-request.model';
import { CoachSignupResponse } from '../models/coach-signup-response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoachService {
  private baseUrl: string = environment.baseUrl + 'coaches';

  constructor(private http: HttpClient) { }

  signUp(coachSignup: CoachSignupRequest): Observable<CoachSignupResponse> | null {
    return this.http.post<CoachSignupResponse>(this.baseUrl + '/signup', coachSignup);
  }
}
