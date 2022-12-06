import { CoachClassResponse } from './../../models/coach-class-response.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-coaches-classes-list',
  templateUrl: './coaches-classes-list.component.html',
  styleUrls: ['./coaches-classes-list.component.css']
})
export class CoachesClassesListComponent implements OnInit {
  @Input() coachClasses: CoachClassResponse[] = [];

  constructor() { }

  ngOnInit() {
    console.log('coachClasses', this.coachClasses);
  }

}
