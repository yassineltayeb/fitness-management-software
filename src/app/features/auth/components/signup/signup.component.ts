import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service.ts.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onLogin() {
    this.authService.isLoginMode.next(true);
  }

}
