import { Router } from '@angular/router';
import { CoachLoginResponse } from './../models/coach-login-response.model';
import { CoachLoginRequest } from './../models/coach-login-request.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { CoachSignupRequest } from '../models/coach-signup-request.model';
import { CoachSignupResponse } from '../models/coach-signup-response.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class CoachService {
  private baseUrl: string = environment.baseUrl + 'coaches';
  decodedToken: any;
  isLoggedIn = new BehaviorSubject<boolean>(this.tokenAvailable());

  jwtHelper = new JwtHelperService();

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

  logout(): void {
    // Clear JWT from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    // Update logged in status
    this.setIsLoggedIn(false);
    // Navigate user back to login page
    this.router.navigate(['/login']);
  }

  private tokenAvailable(): boolean {
    return !!localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token') ?? "";
    // Check whether the token is expired and return true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  setIsLoggedIn(isLoggedIn: boolean): void {
    this.isLoggedIn.next(isLoggedIn);
  }

  getIsLoggedIn(): BehaviorSubject<boolean> {
    return this.isLoggedIn;
  }

  getDecodedToken(): any {
    const token = localStorage.getItem('token') ?? "";
    return this.jwtHelper.decodeToken(token);
  }

  getCurrentUser() {
    if (this.isLoggedIn) {
      const token = localStorage.getItem('token') ?? "";
      return this.jwtHelper.decodeToken(token).unique_name;
    }
  }
}
