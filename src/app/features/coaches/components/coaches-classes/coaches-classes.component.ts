import { Data } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { CoachClassService } from './../../services/coach-class.service';
import { Component, OnInit } from '@angular/core';
import { PagedResult } from 'src/app/shared/models/paged-result.model';
import { CoachClassResponse } from '../../models/coach-class-response.model';

@Component({
  selector: 'app-coaches-classes',
  templateUrl: './coaches-classes.component.html',
  styleUrls: ['./coaches-classes.component.css']
})
export class CoachesClassesComponent implements OnInit {
  coachClasses = {} as PagedResult<CoachClassResponse>;

  constructor(
    private coachClassService: CoachClassService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getCoachClasses();
  }

  getCoachClasses() {
    this.spinner.show();

    this.coachClassService.getCoachesClasses('', 1, 50).subscribe({
      next: (coachClasses: PagedResult<CoachClassResponse>) => {
        this.coachClasses = coachClasses;
        console.log(this.coachClasses);
      },
      error: (error: HttpErrorResponse) => {
        this.toaster.error(error.error.error);
      },
      complete: () => {
        this.spinner.hide();
      }
    });
  }

}
