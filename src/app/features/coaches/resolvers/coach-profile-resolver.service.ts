import { HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { CoachProfileResponse } from '../models/coach-profile-response.model';
import { CoachService } from '../services/coach.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoachProfileResolver implements Resolve<CoachProfileResponse> {

  constructor(
    private coachService: CoachService,
    private spinner: NgxSpinnerService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): CoachProfileResponse | Observable<CoachProfileResponse> | Promise<CoachProfileResponse> {
    this.spinner.show();
    return this.coachService.getCoachById(+route.params['coachId']).pipe(
      map((coach: CoachProfileResponse) => {
        this.spinner.hide();
        return coach;
      }),
      catchError((error: HttpErrorResponse) => {
        this.spinner.hide();
        return throwError(() => new Error(error.error.error));
      }));
  }
}
