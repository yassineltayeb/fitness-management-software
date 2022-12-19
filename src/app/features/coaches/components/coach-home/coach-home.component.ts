import { CoachClassStatusSummaryResponse } from './../../models/coach-class-status-summary-response.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CoachClassService } from './../../services/coach-class.service';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { PagedResult } from 'src/app/shared/models/paged-result.model';
import { CoachClassResponse } from '../../models/coach-class-response.model';
import { formatDate } from '@angular/common';
import { faTicket, faFlagCheckered, faXmark, faStopwatch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-coach-home',
  templateUrl: './coach-home.component.html',
  styleUrls: ['./coach-home.component.css']
})
export class CoachHomeComponent implements OnInit {
  coachClassStatusSummary = {} as CoachClassStatusSummaryResponse;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: [] = [],
    eventClick: (arg) => this.handleDateClick(arg)
  };
  faTicket = faTicket;
  faFlagCheckered = faFlagCheckered;
  faXmark = faXmark;
  faStopwatch = faStopwatch;

  constructor(
    private coachClassService: CoachClassService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.populateEvents();
    this.getCoachClassesStatusSummary();
  }

  getCoachClassesStatusSummary() {
    const currentUser = this.authService.getCurrentUser();

    this.coachClassService.getCoachClassesStatusSummary(currentUser.userId).subscribe({
      next: (coachClassStatusSummaryResponse: CoachClassStatusSummaryResponse) => {
        this.coachClassStatusSummary = coachClassStatusSummaryResponse;
      },
      error: () => {

      },
      complete: () => {

      }
    });
  }

  populateEvents() {
    this.coachClassService.getCoachesClasses('', 1, 1000).subscribe({
      next: (coachClasses: PagedResult<CoachClassResponse>) => {
        var events: any[] = [];

        coachClasses.data.forEach((coachClass: CoachClassResponse) => {
          events.push(
            {
              coachClassId: coachClass.id,
              title: coachClass.title,
              date: formatDate(coachClass.classDate, 'yyyy-MM-dd', 'en-US')
            },
          );
        });

        this.calendarOptions.events = events;
      },
      error: () => {

      },
      complete: () => {

      }
    });
  }

  /* ----------------------------- Event Handlers ----------------------------- */
  handleDateClick(arg: any): void {
    console.log(arg.event._def.extendedProps);
  }

}
