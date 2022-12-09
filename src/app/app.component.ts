import { AuthService } from './shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CommonService } from './shared/services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn: boolean = false;
  sidebarToggled: boolean = false;

  constructor(
    private authService: AuthService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.getAuthenticationState();
    this.commonService.sidebarToggled.subscribe(value => this.sidebarToggled = value);
  }

  getAuthenticationState(): void {
    this.isLoggedIn = false;
    this.authService.getIsLoggedIn().subscribe(value => {
      this.isLoggedIn = value;
    });
  }
}
