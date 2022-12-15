import { CoachClassService } from './../../services/coach-class.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faEdit, faXmark, faNoteSticky, faLocationDot, faCalendar, faClock, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from 'src/app/shared/models/pagination.model';
import { CoachClassResponse } from '../../models/coach-class-response.model';

@Component({
  selector: 'app-coaches-classes-grid',
  templateUrl: './coaches-classes-grid.component.html',
  styleUrls: ['./coaches-classes-grid.component.css']
})
export class CoachesClassesGridComponent implements OnInit {
  @Input() coachClasses: CoachClassResponse[] = [];
  @Input() pagination = {} as Pagination
  @Output() currentPagination = new EventEmitter<Pagination>();
  @Output() selectedCoachClassId = new EventEmitter<number>();
  faNoteSticky = faNoteSticky;
  faLocationDot = faLocationDot;
  faCalendar = faCalendar;
  faClock = faClock;
  faUsers = faUsers;
  faEdit = faEdit;
  faXmark = faXmark;

  constructor(private coachClassService: CoachClassService) { }

  ngOnInit() {
  }

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
}
