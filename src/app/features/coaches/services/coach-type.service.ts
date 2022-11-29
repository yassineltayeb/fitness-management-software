import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { KeyValuePairs } from 'src/app/shared/models/key-value-pairs.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoachTypeService {
  private baseUrl = environment.baseUrl + 'coachTypes';

  constructor(private http: HttpClient) { }

  getCoachTypes(): Observable<KeyValuePairs[]> {
    return this.http.get<KeyValuePairs[]>(this.baseUrl);
  }
}
