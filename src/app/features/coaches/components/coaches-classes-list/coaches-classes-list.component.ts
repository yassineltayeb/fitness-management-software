import { ToasterService } from './../../../../shared/services/toaster.service';
import { CoachClassService } from './../../services/coach-class.service';
import { CoachClassResponse } from './../../models/coach-class-response.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pagination } from 'src/app/shared/models/pagination.model';
import { faEdit, faXmark } from '@fortawesome/free-solid-svg-icons'
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-coaches-classes-list',
  templateUrl: './coaches-classes-list.component.html',
  styleUrls: ['./coaches-classes-list.component.css']
})
export class CoachesClassesListComponent implements OnInit {
  @Input() coachClasses: CoachClassResponse[] = [];
  @Input() pagination = {} as Pagination
  @Output() currentPagination = new EventEmitter<Pagination>();
  @Output() selectedCoachClassId = new EventEmitter<number>();
  @Output() DeletedCoachClass = new EventEmitter<CoachClassResponse>();
  faEdit = faEdit;
  faXmark = faXmark;

  constructor(
    private coachClassService: CoachClassService,
    private confirmationService: ConfirmationService,
    private toasterService: ToasterService) { }

  ngOnInit() {
  }

  /* --------------------------------- Events --------------------------------- */
  pageChangeEvent(event: any) {
    this.pagination.currentPage = event.page + 1;
    this.pagination.itemsPerPage = event.rows;
    this.currentPagination.emit(this.pagination);
  }

  onEdit(coachClassId: number) {
    this.selectedCoachClassId.emit(coachClassId);
  }

  getCoachClassStatusById(statusId: number): string {
    return this.coachClassService.getCoachClassStatusById(statusId);
  }

  getCoachClassStatusColor(statusId: number): string {
    return this.coachClassService.getCoachClassStatusColor(statusId);
  }

  /* --------------------------------- Events --------------------------------- */
  onDelete(coachClass: CoachClassResponse) {
    this.DeletedCoachClass.emit(coachClass);
  }
}
