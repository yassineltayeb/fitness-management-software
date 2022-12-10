import { CoachClassResponse } from './../../models/coach-class-response.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pagination } from 'src/app/shared/models/pagination.model';
import { faEdit, faXmark } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-coaches-classes-list',
  templateUrl: './coaches-classes-list.component.html',
  styleUrls: ['./coaches-classes-list.component.css']
})
export class CoachesClassesListComponent implements OnInit {
  @Input() coachClasses: CoachClassResponse[] = [];
  @Input() pagination = {} as Pagination
  @Output() currentPagination = new EventEmitter<Pagination>();
  faEdit = faEdit;
  faXmark = faXmark;

  constructor() { }

  ngOnInit() {
  }

  pageChangeEvent(event: number) {
    this.pagination.currentPage = event;
    console.log('sent pagination', this.pagination);
    this.currentPagination.emit(this.pagination);
  }
}
