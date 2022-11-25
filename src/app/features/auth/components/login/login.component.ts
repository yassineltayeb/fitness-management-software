import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service.ts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSignUp() {
    this.authService.isLoginMode.next(false);
  }

}
