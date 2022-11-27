import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChangeDetectorRef, Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../../services/auth.service.ts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private authService: AuthService
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
    console.log(this.loginForm.value);
  }

  /* --------------------------------- Getters -------------------------------- */
  get loginFormControls() {
    return this.loginForm.controls;
  }
}
