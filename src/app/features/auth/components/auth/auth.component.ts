import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service.ts.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  title: string = 'Login';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isLoginMode.subscribe((isLoginMode: boolean) => {
      this.isLoginMode = isLoginMode;
      console.log('changed to ', this.isLoginMode);
    });
  }

  onToggleAuthMode(authMode: boolean) {
    this.isLoginMode = authMode;
    this.isLoginMode ? this.title = 'Login' : this.title = 'Signup';
  }
}
