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
import { DialogService } from 'primeng/dynamicdialog';
import { CoachesClassesFormComponent } from '../coaches-classes-form/coaches-classes-form.component';
import { ConfirmationService } from 'primeng/api';
import { CoachClassStatus } from 'src/app/core/enums/coach-class-status.enum';

@Component({
  selector: 'app-coaches-classes',
  templateUrl: './coaches-classes.component.html',
  styleUrls: ['./coaches-classes.component.css']
})
export class CoachesClassesComponent implements OnInit {
  coachClasses = {} as PagedResult<CoachClassResponse>;
  public pagination = {} as Pagination;
  searchTerm: string = "";
  classDates: Date[] = [];
  viewMode: ViewMode = 1;
  statusId: CoachClassStatus = 0;
  faList = faList;
  faGrip = faGrip;

  constructor(
    private coachClassService: CoachClassService,
    private spinner: NgxSpinnerService,
    private toaster: ToasterService,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.getCoachClasses();
  }

  onSelect() {
    console.log(this.classDates);
  }

  getCoachClasses() {
    this.spinner.show();

    this.coachClassService.getCoachesClasses(
      this.searchTerm, this.statusId,
      this.classDates[0], this.classDates[1],
      this.pagination.currentPage, this.pagination.itemsPerPage).subscribe({
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

  onStatusChang(statusId: number) {
    this.statusId = statusId;
    this.pagination.currentPage = 1;
    this.getCoachClasses();
  }

  showCoachClassForm(coachClassId: number = 0) {
    const ref = this.dialogService.open(CoachesClassesFormComponent, {
      data: {
        id: coachClassId,
        readOnlyMode: false
      },
      header: (coachClassId == 0) ? 'Add New Class' : 'Update Class',
      width: '60%'
    });

    ref.onClose.subscribe(() => {
      this.pagination.currentPage = 1;
      this.getCoachClasses();
    });
  }

  onCoachClassEdit(coachClassId: number) {
    this.showCoachClassForm(coachClassId);
  }

  /* --------------------------------- Events --------------------------------- */
  onCoachClassDelete(coachClass: CoachClassResponse) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to cancel this class?',
      header: 'Cancel Coach Class',
      icon: 'pi pi-exclamation-circle',
      accept: () => {
        this.coachClassService.updateCoachClassStatus(coachClass.id, CoachClassStatus.Canceled).subscribe({
          next: (CoachClass: CoachClassResponse) => {
          },
          error: () => {
          },
          complete: () => {
            this.getCoachClasses();
            this.toaster.success('Coach Class', 'Coach Class Deleted!');
          }
        });
      }
    });
  }
}
