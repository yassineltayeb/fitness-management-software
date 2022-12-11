import { NgxSpinnerService } from 'ngx-spinner';
import { HttpErrorResponse } from '@angular/common/http';
import { CoachClassService } from './../../services/coach-class.service';
import { Component, OnInit } from '@angular/core';
import { PagedResult } from 'src/app/shared/models/paged-result.model';
import { CoachClassResponse } from '../../models/coach-class-response.model';
import { Pagination } from 'src/app/shared/models/pagination.model';
import { faList, faGrip } from '@fortawesome/free-solid-svg-icons';
import { ViewMode } from 'src/app/core/enums/view-mode.enum';
import { ToasterService } from 'src/app/shared/services/toaster.service';

@Component({
  selector: 'app-coaches-classes',
  templateUrl: './coaches-classes.component.html',
  styleUrls: ['./coaches-classes.component.css']
})
export class CoachesClassesComponent implements OnInit {
  coachClasses = {} as PagedResult<CoachClassResponse>;
  public pagination = {} as Pagination;
  searchTerm: string = "";
  viewMode: ViewMode = 2;
  faList = faList;
  faGrip = faGrip;

  constructor(
    private coachClassService: CoachClassService,
    private spinner: NgxSpinnerService,
    private toaster: ToasterService) { }

  ngOnInit() {
    this.getCoachClasses();

  }

  getCoachClasses() {
    this.spinner.show();

    this.coachClassService.getCoachesClasses(this.searchTerm, this.pagination.currentPage, this.pagination.itemsPerPage).subscribe({
      next: (coachClasses: PagedResult<CoachClassResponse>) => {
        this.coachClasses = coachClasses;
        this.pagination.itemsPerPage = coachClasses.itemsPerPage;
        this.pagination.currentPage = coachClasses.currentPage;
        this.pagination.totalItems = coachClasses.totalItems;
      },
      error: (error: HttpErrorResponse) => {
        this.toaster.error('Classes', error.error.error);
        this.spinner.hide();
      },
      complete: () => {
        this.spinner.hide();
      }
    });
  }

  /* --------------------------------- Events --------------------------------- */
  onPageChange(pagination: Pagination) {
    this.pagination = pagination;
    this.getCoachClasses();
  }

  onViewModeChange(viewMode: number) {
    this.viewMode = viewMode;
  }
}
