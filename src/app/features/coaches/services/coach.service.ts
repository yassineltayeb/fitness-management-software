import { CoachProfileRequest } from './../models/coach-profile-request.model';
import { Router } from '@angular/router';
import { CoachLoginResponse } from './../models/coach-login-response.model';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { CoachSignupRequest } from '../models/coach-signup-request.model';
import { CoachSignupResponse } from '../models/coach-signup-response.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CoachProfileResponse } from '../models/coach-profile-response.model';

@Injectable({
  providedIn: 'root'
})
export class CoachService {
  private baseUrl: string = environment.baseUrl + 'coaches';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  signUp(signupRequest: CoachSignupRequest): Observable<CoachSignupResponse> | null {
    return this.http.post<CoachSignupResponse>(this.baseUrl + '/signup', signupRequest).pipe(
      map((loginResponse: CoachLoginResponse) => {
        localStorage.setItem('token', loginResponse.token);
        localStorage.setItem('expiration', loginResponse.expiration.toString());
        this.router.navigate(['/home']);

        return loginResponse;
      }));
  }

  getCoachById(coachId: number): Observable<CoachProfileResponse> {
    return this.http.get<CoachProfileResponse>(this.baseUrl + '/' + coachId);
  }

  updateCoach(coachId: number, coach: CoachProfileRequest) {
    console.log('id', coachId);
    console.log('coach', coach);
    return this.http.put<CoachProfileResponse>(this.baseUrl + '/' + coachId, coach);
  }
}
