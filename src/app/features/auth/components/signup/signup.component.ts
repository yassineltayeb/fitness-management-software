import { Router } from '@angular/router';
import { CityService } from './../../../../shared/services/city.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { KeyValuePairs } from 'src/app/shared/models/key-value-pairs.model';
import { CountryService } from 'src/app/shared/services/country.service';
import { GenderService } from 'src/app/shared/services/gender.service';
import { AuthService } from '../../services/auth.service.ts.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/shared/helper/CustomValidators.validators';

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
    private cityService: CityService
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
    this.initSignupForm();

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

  initSignupForm() {
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

  onLogin() {
    this.authService.isLoginMode.next(true);
  }

  onCountryChange() {
    const countryId = +this.signupForm.value.countryId;
    this.getCities(countryId);
  }

  onSubmit() {
    console.log(this.signupForm.valid);
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
