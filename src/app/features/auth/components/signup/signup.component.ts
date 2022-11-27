import { CoachSignupRequest } from './../../../coaches/models/coach-signup-request.model';
import { ToastrService } from 'ngx-toastr';
import { CityService } from './../../../../shared/services/city.service';
import { Component, OnInit } from '@angular/core';
import { KeyValuePairs } from 'src/app/shared/models/key-value-pairs.model';
import { CountryService } from 'src/app/shared/services/country.service';
import { GenderService } from 'src/app/shared/services/gender.service';
import { AuthService } from '../../services/auth.service.ts.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/shared/helper/CustomValidators.validators';
import { CoachService } from 'src/app/features/coaches/services/coach.service';
import { CoachSignupResponse } from 'src/app/features/coaches/models/coach-signup-response.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  genders: KeyValuePairs[] = [];
  countries: KeyValuePairs[] = [];
  cities: KeyValuePairs[] = [];
  signupForm: FormGroup;

  constructor(
    private authService: AuthService,
    private genderService: GenderService,
    private countryService: CountryService,
    private cityService: CityService,
    private coachService: CoachService,
    private toastr: ToastrService
  ) {
    this.signupForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      genderId: new FormControl('', Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, Validators.required),
      countryId: new FormControl('', Validators.required),
      cityId: new FormControl('', Validators.required),
      dateOfBirth: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required)
    },
      [CustomValidators.MatchValidator('password', 'password2')]
    );
  }

  ngOnInit(): void {
    this.getGenders();
    this.getCountries();

    this.authService.isLoginMode.next(false);
  }

  getGenders() {
    this.genderService.getGenders().subscribe((genders: KeyValuePairs[]) => {
      this.genders = genders;
    });
  }

  getCountries() {
    this.countryService.getCountries().subscribe((countries: KeyValuePairs[]) => {
      this.countries = countries;
    });
  }

  getCities(countryId: number) {
    this.cityService.getCities(countryId).subscribe((cities: KeyValuePairs[]) => {
      this.cities = cities;
    })
  }

  onLogin() {
    this.authService.isLoginMode.next(true);
  }

  onCountryChange() {
    const countryId = +this.signupForm.value.countryId;
    this.getCities(countryId);
  }

  onSubmit() {
    this.coachService.signUp(this.signupForm.value)?.subscribe((signupResponse: CoachSignupResponse) => {
      this.toastr.success('You signed up successfully', 'Sign Up');
      localStorage.setItem('token', signupResponse.token);
      localStorage.setItem('expiration', signupResponse.expiration.toString());
      this.signupForm.reset();
    }, (error: HttpErrorResponse) => {
      this.toastr.error(error.error.error, 'Sign Up');
      console.log(error);
    });
  }

  /* --------------------------------- Getters -------------------------------- */
  get signupFormControls() {
    return this.signupForm.controls;
  }

  get passwordMatchError() {
    return (
      this.signupForm.getError('mismatch') &&
      this.signupForm.get('password2')?.touched
    );
  }
}
