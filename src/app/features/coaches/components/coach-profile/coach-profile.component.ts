import { CoachService } from 'src/app/features/coaches/services/coach.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CoachTypeService } from './../../services/coach-type.service';
import { CountryService } from './../../../../shared/services/country.service';
import { GenderService } from './../../../../shared/services/gender.service';
import { CityService } from './../../../../shared/services/city.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { CoachProfileResponse } from './../../models/coach-profile-response.model';
import { ActivatedRoute, Data } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { KeyValuePairs } from 'src/app/shared/models/key-value-pairs.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-coach-profile',
  templateUrl: './coach-profile.component.html',
  styleUrls: ['./coach-profile.component.css']
})
export class CoachProfileComponent implements OnInit {
  genders: KeyValuePairs[] = [];
  countries: KeyValuePairs[] = [];
  cities: KeyValuePairs[] = [];
  coachTypes: KeyValuePairs[] = [];
  selectedCoachType: KeyValuePairs[] = [];
  coach = {} as CoachProfileResponse;
  profileForm = {} as FormGroup;
  dropdownSettings: IDropdownSettings = {};

  constructor(
    private cityService: CityService,
    private countryService: CountryService,
    private coachService: CoachService,
    private coachTypeService: CoachTypeService,
    private genderService: GenderService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.getCoach();
    this.getGenders();
    this.getCountries();
    this.multiSelectDropdownSettings();
    this.initForm();
  }

  async initForm() {
    this.profileForm = new FormGroup({
      firstName: new FormControl(this.coach.firstName, Validators.required),
      lastName: new FormControl(this.coach.lastName, Validators.required),
      genderId: new FormControl(this.coach.genderId, Validators.required),
      phone: new FormControl(this.coach.phone, Validators.required),
      coachTypesIds: new FormControl(null, Validators.required),
      countryId: new FormControl(this.coach.countryId, Validators.required),
      dateOfBirth: new FormControl(formatDate(this.coach.dateOfBirth, 'MM/dd/yyyy', 'en'), Validators.required),
    }
    );
    console.log('date', formatDate(this.coach.dateOfBirth, 'MM/dd/yyyy', 'en'));
    // populate cities
    this.getCities(this.coach.countryId);
    this.profileForm.addControl('cityId', new FormControl(this.coach.cityId, Validators.required));

    // populate coach types
    this.getCoachTypes().subscribe(() => {
      this.selectedCoachType = this.coachTypes.filter((coachType: KeyValuePairs) => {
        return this.coach.coachTypesIds.includes(coachType.id);
      });

      this.profileForm.addControl('coachTypesIds', new FormControl(this.selectedCoachType, Validators.required))
    });
  }

  getCoach() {
    this.route.data.subscribe((data: Data) => {
      this.coach = data['coach'];
    }, (error: HttpErrorResponse) => {
      this.toastr.error(error.error.error, 'Coach Profile');
    });
  }

  getGenders() {
    this.spinner.show();
    this.genderService.getGenders().subscribe((genders: KeyValuePairs[]) => {
      this.genders = genders;
      this.spinner.hide();
    }, (error: HttpErrorResponse) => {
      this.toastr.error(error.error.error, 'Sign Up');
      this.spinner.hide();
    });
  }

  getCountries() {
    this.spinner.show();
    this.countryService.getCountries().subscribe((countries: KeyValuePairs[]) => {
      this.countries = countries;
      this.spinner.hide();
    }, (error: HttpErrorResponse) => {
      this.toastr.error(error.error.error, 'Sign Up');
      this.spinner.hide();
    }
    );
  }

  onCountryChange() {
    const countryId = +this.profileForm.value.countryId;
    this.getCities(countryId);
  }

  getCities(countryId: number) {
    this.spinner.show();
    this.cityService.getCities(countryId).subscribe((cities: KeyValuePairs[]) => {
      this.cities = cities;
      this.spinner.hide();
    }, (error: HttpErrorResponse) => {
      this.toastr.error(error.error.error, 'Sign Up');
      this.spinner.hide();
    });
  }

  getCoachTypes() {
    this.spinner.show();
    return this.coachTypeService.getCoachTypes().pipe(map((coachTypes: KeyValuePairs[]) => {
      this.spinner.hide();
      this.coachTypes = coachTypes;
      return coachTypes;
    }),
      catchError((error: HttpErrorResponse) => {
        return throwError(() => new Error(error.error.error))
      }));
  }

  onSubmit() {

    // get selected coach types
    const selectedCoachTypes = this.profileForm.controls['coachTypesIds'].value.map((item: KeyValuePairs) => {
      return item.id;
    });

    var profileRequest = { ...this.profileForm.value, coachTypesIds: selectedCoachTypes };

    this.spinner.show();
    this.coachService.updateCoach(this.coach.id, profileRequest)?.subscribe((profileResponse: CoachProfileResponse) => {
      this.toastr.success('Profile updated successfully', 'Profile');
      this.spinner.hide();
    }, (error: HttpErrorResponse) => {
      this.toastr.error(error.error.error, 'Profile');
      this.spinner.hide();
    });
  }

  /* --------------------------------- Getters -------------------------------- */
  get profileFormControls() {
    return this.profileForm.controls;
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
