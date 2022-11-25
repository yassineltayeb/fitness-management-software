import { CityService } from './../../../../shared/services/city.service';
import { Component, OnInit } from '@angular/core';
import { KeyValuePairs } from 'src/app/shared/models/key-value-pairs.model';
import { CountryService } from 'src/app/shared/services/country.service';
import { GenderService } from 'src/app/shared/services/gender.service';
import { AuthService } from '../../services/auth.service.ts.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private fb: FormBuilder
  ) {
    this.signupForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      genderId: ['', Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, Validators.required],
      countryId: ['', Validators.required],
      cityId: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      password: [null, Validators.required],
      password2: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getGenders();
    this.getCountries();
    this.initSignupForm();
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
    this.signupForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      genderId: ['', Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, Validators.required],
      countryId: ['', Validators.required],
      cityId: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      password: [null, Validators.required],
      password2: [null, Validators.required]
    });
  }

  onLogin() {
    this.authService.isLoginMode.next(true);
  }

  onCountryChange() {
    const countryId = +this.signupForm.value.countryId;
    this.getCities(countryId);
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  get signupFormControls() {
    return this.signupForm.controls;
  }
}
