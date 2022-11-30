import { AuthService } from './features/auth/services/auth.service.ts.service';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getAuthenticationState();
  }

  getAuthenticationState(): void {
    this.authService.getIsLoggedIn().subscribe(value => this.isLoggedIn = value);
  }
}
