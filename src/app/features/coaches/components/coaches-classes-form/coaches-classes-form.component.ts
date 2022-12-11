import { AuthService } from './../../../../shared/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CoachClassService } from './../../services/coach-class.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CoachService } from './../../services/coach.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CoachClassRequest } from '../../models/coach-class-request.model';
import { formatDate } from '@angular/common';
import { CoachClassResponse } from '../../models/coach-class-response.model';
import { ToasterService } from 'src/app/shared/services/toaster.service';

@Component({
  selector: 'app-coaches-classes-form',
  templateUrl: './coaches-classes-form.component.html',
  styleUrls: ['./coaches-classes-form.component.css']
})
export class CoachesClassesFormComponent implements OnInit {
  coachClassForm = {} as FormGroup;
  coachClass = {} as CoachClassResponse;

  constructor(
    private coachClassService: CoachClassService,
    private authService: AuthService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private toasterService: ToasterService) { }

  ngOnInit() {
    this.initForm();
    if (this.config.data.id != 0) {
      this.getCoachClass();
    }
  }

  initForm() {
    this.coachClassForm = new FormGroup({
      title: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      classDate: new FormControl('', Validators.required),
      duration: new FormControl(0, Validators.required),
      availableSpaces: new FormControl(0, Validators.required),
      description: new FormControl('', Validators.required),
    }
    );
  }

  getCoachClass() {
    this.coachClassService.getCoachClassById(this.config.data.id).subscribe({
      next: (coachClass: CoachClassResponse) => {
        this.coachClass = coachClass;
      },
      error: (error: HttpErrorResponse) => {
        this.toasterService.error('Coach Class', error.error.error);

      },
      complete: () => {
      }
    });
  }

  onSubmit() {
    const currentUser = this.authService.getCurrentUser();
    const coachClassRequest = { ...this.coachClassForm.value, coachId: currentUser.userId };
    console.log(coachClassRequest);
    this.coachClassService.addCoachClass(coachClassRequest).subscribe({
      next: (coachClass: CoachClassResponse) => {

      },
      error: (error: HttpErrorResponse) => {
        this.toasterService.error('Coach Class', error.error.error);
      },
      complete: () => {
        this.toasterService.success('Coach Class', 'Class Added Successfully');
      }
    });
  }

  /* --------------------------------- Getters -------------------------------- */
  get coachClassFormControls() {
    return this.coachClassForm.controls;
  }

  /* --------------------------------- Events --------------------------------- */
  onClear() {
    this.coachClassForm.reset();
  }
}
