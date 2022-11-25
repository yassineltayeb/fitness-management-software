import { KeyValuePairs } from './../models/key-value-pairs.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenderService {
  private baseUrl: string = environment.baseUrl + 'genders';

  constructor(private http: HttpClient) { }

  getGenders(): Observable<KeyValuePairs[]> {
    return this.http.get<KeyValuePairs[]>(this.baseUrl);
  }
}
