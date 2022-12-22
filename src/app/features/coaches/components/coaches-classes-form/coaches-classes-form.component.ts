import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './../../../../shared/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CoachClassService } from './../../services/coach-class.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
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
  readOnlyMode: boolean = false;

  constructor(
    private coachClassService: CoachClassService,
    private authService: AuthService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private toasterService: ToasterService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.coachClass.id = this.config.data.id;
    this.readOnlyMode = this.config.data.readOnlyMode;

    this.initForm();
    if (this.coachClass.id != 0) {
      this.getCoachClass();
    }
  }

  initForm() {
    this.coachClassForm = new FormGroup({
      title: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      classDate: new FormControl(
        {
          value: '',
          disabled: this.readOnlyMode
        }, Validators.required),
      duration: new FormControl(0, [
        Validators.required,
        Validators.min(1)
      ]),
      availableSpaces: new FormControl(0, [
        Validators.required,
        Validators.min(1)
      ]),
      description: new FormControl('', Validators.required),
    }
    );
  }

  populateForm() {
    this.coachClassForm.setValue({
      title: this.coachClass.title,
      location: this.coachClass.location,
      // classDate: formatDate(this.coachClass.classDate, 'dd-MMM-yyyy', 'en'),
      classDate: this.coachClass.classDate,
      duration: this.coachClass.duration,
      availableSpaces: this.coachClass.availableSpaces,
      description: this.coachClass.description,
    });
  }

  getCoachClass() {
    this.spinner.show();
    this.coachClassService.getCoachClassById(this.config.data.id).subscribe({
      next: (coachClass: CoachClassResponse) => {
        this.coachClass = coachClass;
      },
      error: (error: HttpErrorResponse) => {
        this.toasterService.error('Coach Class', error.error.error);

      },
      complete: () => {
        this.populateForm();
        this.spinner.hide();
      }
    });
  }

  onSubmit() {
    const currentUser = this.authService.getCurrentUser();
    const coachClassRequest = { ...this.coachClassForm.value, coachId: currentUser.userId };
    if (this.config.data.id === 0) {
      this.addCoachClass(coachClassRequest);
    }
    else {
      this.updateCoachClass(coachClassRequest);
    }
  }

  addCoachClass(coachClassRequest: any) {
    this.spinner.show();
    this.coachClassService.addCoachClass(coachClassRequest).subscribe({
      next: (coachClass: CoachClassResponse) => {

      },
      error: (error: HttpErrorResponse) => {
        this.toasterService.error('Coach Class', error.error.error);
        this.spinner.hide();
      },
      complete: () => {
        this.toasterService.success('Coach Class', 'Class Added Successfully');
        this.coachClassForm.reset();
        this.spinner.hide();
        this.ref.close();
      }
    });
  }

  updateCoachClass(coachClassRequest: any) {
    this.spinner.show();
    this.coachClassService.updateCoachClass(this.config.data.id, coachClassRequest).subscribe({
      next: (coachClass: CoachClassResponse) => {
      },
      error: (error: HttpErrorResponse) => {
        this.toasterService.error('Coach Class', error.error.error);
        this.spinner.hide();
      },
      complete: () => {
        this.toasterService.success('Coach Class', 'Class Updated Successfully');
        this.spinner.hide();
        this.ref.close();
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
