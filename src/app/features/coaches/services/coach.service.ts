import { Router } from '@angular/router';
import { CoachLoginResponse } from './../models/coach-login-response.model';
import { CoachLoginRequest } from './../models/coach-login-request.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { CoachSignupRequest } from '../models/coach-signup-request.model';
import { CoachSignupResponse } from '../models/coach-signup-response.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";

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
    return this.http.post<CoachSignupResponse>(this.baseUrl + '/signup', signupRequest).pipe(map((loginResponse: CoachLoginResponse) => {
      localStorage.setItem('token', loginResponse.token);
      localStorage.setItem('expiration', loginResponse.expiration.toString());
      this.router.navigate(['/home']);

      return loginResponse;
    }));
  }

  login(loginRequest: CoachLoginRequest): Observable<CoachLoginResponse> | null {
    return this.http.post<CoachLoginResponse>(this.baseUrl + '/login', loginRequest).pipe(map((loginResponse: CoachLoginResponse) => {
      localStorage.setItem('token', loginResponse.token);
      localStorage.setItem('expiration', loginResponse.expiration.toString());
      this.router.navigate(['/home']);

      return loginResponse;
    }));
  }
}
