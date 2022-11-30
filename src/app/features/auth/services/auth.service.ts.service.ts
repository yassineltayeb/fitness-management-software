import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoginMode = new Subject<boolean>();
  isLoggedIn = new BehaviorSubject<boolean>(this.tokenAvailable());

  private jwtHelper = new JwtHelperService();

  constructor(private router: Router) { }

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
    console.log('get token', localStorage.getItem('token'));
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
