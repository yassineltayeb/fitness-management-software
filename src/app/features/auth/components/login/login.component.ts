import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { UserType } from 'src/app/core/enums/user-type.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userType: UserType = 1;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      userType: new FormControl(1, Validators.required)
    });
  }

  ngOnInit(): void {
    this.authService.isLoginMode.next(true);
    this.authService.userType.subscribe((userType) => this.userType = userType);
  }

  onSignUp() {
    this.authService.isLoginMode.next(false);
  }

  onSubmit() {
    console.log('show');
    this.spinner.show();
    this.loginForm.controls['userType'].setValue(this.userType);

    this.authService.login(this.loginForm.value)?.subscribe({
      next: () => {
        this.toastr.success('Logged in successfully', 'Login');
        this.spinner.hide();
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.error.error, 'Login');
        this.spinner.hide();
      }
    });
  }

  /* --------------------------------- Getters -------------------------------- */
  get loginFormControls() {
    return this.loginForm.controls;
  }
}
