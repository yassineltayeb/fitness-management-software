import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { CoachClassService } from './../../services/coach-class.service';
import { Component, OnInit } from '@angular/core';
import { PagedResult } from 'src/app/shared/models/paged-result.model';
import { CoachClassResponse } from '../../models/coach-class-response.model';
import { Pagination } from 'src/app/shared/models/pagination.model';

@Component({
  selector: 'app-coaches-classes',
  templateUrl: './coaches-classes.component.html',
  styleUrls: ['./coaches-classes.component.css']
})
export class CoachesClassesComponent implements OnInit {
  coachClasses = {} as PagedResult<CoachClassResponse>;
  public pagination = {} as Pagination;

  constructor(
    private coachClassService: CoachClassService,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getCoachClasses();
  }

  getCoachClasses() {
    this.spinner.show();

    this.coachClassService.getCoachesClasses('', this.pagination.currentPage, this.pagination.itemsPerPage).subscribe({
      next: (coachClasses: PagedResult<CoachClassResponse>) => {
        this.coachClasses = coachClasses;
        this.pagination.itemsPerPage = coachClasses.itemsPerPage;
        this.pagination.currentPage = coachClasses.currentPage;
        this.pagination.totalItems = coachClasses.totalItems;
        console.log('coachClasses', coachClasses);
      },
      error: (error: HttpErrorResponse) => {
        this.toaster.error(error.error.error);
      },
      complete: () => {
        this.spinner.hide();
      }
    });
  }

  onPageChange(pagination: Pagination) {
    this.pagination = pagination;
    console.log('on change', this.pagination);
    this.getCoachClasses();
  }
}
