import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { CoachLoginResponse } from './../../../coaches/models/coach-login-response.model';
import { CoachService } from 'src/app/features/coaches/services/coach.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service.ts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private coachService: CoachService,
    private toastr: ToastrService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this.authService.isLoginMode.next(true);
  }

  onSignUp() {
    this.authService.isLoginMode.next(false);
  }

  onSubmit() {
    this.coachService.login(this.loginForm.value)?.subscribe((loginResponse: CoachLoginResponse) => {
      this.toastr.success('Logged in successfully', 'Login');
      localStorage.setItem('token', loginResponse.token);
      localStorage.setItem('expiration', loginResponse.expiration.toString());
    }, (error: HttpErrorResponse) => {
      this.toastr.error(error.error.error, 'Login');
    });
  }

  /* --------------------------------- Getters -------------------------------- */
  get loginFormControls() {
    return this.loginForm.controls;
  }
}