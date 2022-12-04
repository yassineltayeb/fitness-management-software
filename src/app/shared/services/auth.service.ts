import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CoachLoginRequest } from '../../features/coaches/models/coach-login-request.model';
import { CoachLoginResponse } from '../../features/coaches/models/coach-login-response.model';
import { environment } from 'src/environments/environment';
import { UserType } from 'src/app/core/enums/user-type.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = environment.baseUrl + 'users';

  isLoginMode = new Subject<boolean>();
  userType = new BehaviorSubject<UserType>(UserType.Coach);
  isLoggedIn = new BehaviorSubject<boolean>(this.tokenAvailable());

  private jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private router: Router) { }

  login(loginRequest: CoachLoginRequest): Observable<CoachLoginResponse> | null {
    return this.http.post<CoachLoginResponse>(this.baseUrl + '/login', loginRequest).pipe(map((loginResponse: CoachLoginResponse) => {
      localStorage.setItem('token', loginResponse.token);
      localStorage.setItem('expiration', loginResponse.expiration.toString());

      this.setIsLoggedIn(true);

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
    this.router.navigate(['/auth']);
  }

  private tokenAvailable(): boolean {
    console.log('get token', localStorage.getItem('token'));
    return !!localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token') ?? "";
    // Check whether the token is expired and return true or false
    console.log(this.getDecodedToken());
    console.log(this.getCurrentUser());
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
      return this.jwtHelper.decodeToken(token)?.fullName;
    }
  }
}
