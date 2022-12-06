import { CoachTypeService } from './../../../coaches/services/coach-type.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CoachSignupRequest } from './../../../coaches/models/coach-signup-request.model';
import { ToastrService } from 'ngx-toastr';
import { CityService } from './../../../../shared/services/city.service';
import { Component, OnInit } from '@angular/core';
import { KeyValuePairs } from 'src/app/shared/models/key-value-pairs.model';
import { CountryService } from 'src/app/shared/services/country.service';
import { GenderService } from 'src/app/shared/services/gender.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/shared/helper/CustomValidators.validators';
import { CoachService } from 'src/app/features/coaches/services/coach.service';
import { CoachSignupResponse } from 'src/app/features/coaches/models/coach-signup-response.model';
import { HttpErrorResponse } from '@angular/common/http';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  genders: KeyValuePairs[] = [];
  countries: KeyValuePairs[] = [];
  cities: KeyValuePairs[] = [];
  coachTypes: KeyValuePairs[] = [];
  signupForm = {} as FormGroup;
  dropdownSettings: IDropdownSettings = {};

  constructor(
    private authService: AuthService,
    private genderService: GenderService,
    private countryService: CountryService,
    private cityService: CityService,
    private coachService: CoachService,
    private coachTypeService: CoachTypeService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getGenders();
    this.getCountries();
    this.getCoachTypes();
    this.multiSelectDropdownSettings();
    this.authService.isLoginMode.next(false);
  }

  initForm() {
    this.signupForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      genderId: new FormControl('', Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, Validators.required),
      coachTypesIds: new FormControl('', Validators.required),
      countryId: new FormControl('', Validators.required),
      cityId: new FormControl('', Validators.required),
      dateOfBirth: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required)
    },
      [CustomValidators.MatchValidator('password', 'password2')]
    );
  }

  getGenders() {
    this.spinner.show();
    this.genderService.getGenders().subscribe({
      next: (genders: KeyValuePairs[]) => {
        this.genders = genders;
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.error.error, 'Sign Up');
      },
      complete: () => {
        this.spinner.hide();
      }
    });
  }

  getCountries() {
    this.spinner.show();
    this.countryService.getCountries().subscribe({
      next: (countries: KeyValuePairs[]) => {
        this.countries = countries;
        this.spinner.hide();
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.error.error, 'Sign Up');
        this.spinner.hide();
      }
    });
  }

  getCities(countryId: number) {
    this.spinner.show();
    this.cityService.getCities(countryId).subscribe({
      next: (cities: KeyValuePairs[]) => {
        this.cities = cities;
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.error.error, 'Sign Up');
      },
      complete: () => {
        this.spinner.hide();
      }
    });
  }

  getCoachTypes() {
    this.spinner.show();
    this.coachTypeService.getCoachTypes().subscribe({
      next: (coachTypes: KeyValuePairs[]) => {
        this.coachTypes = coachTypes;
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.error.error, 'Sign Up');
      },
      complete: () => {
        this.spinner.hide();
      }
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

    // get selected coach types
    const selectedCoachTypes = this.signupForm.controls['coachTypesIds'].value.map((item: KeyValuePairs) => {
      return item.id;
    });

    var signupRequest = { ...this.signupForm.value, coachTypesIds: selectedCoachTypes };

    this.spinner.show();
    this.coachService.signUp(signupRequest)?.subscribe({
      next: (signupResponse: CoachSignupResponse) => {
        this.toastr.success('You signed up successfully', 'Sign Up');
        this.authService.setIsLoggedIn(true);
        this.signupForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        this.toastr.error(error.error.error, 'Sign Up');
      },
      complete: () => {
        this.spinner.hide();
      }
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

  /* ----------------------------- Configurations ----------------------------- */
  multiSelectDropdownSettings() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
}
