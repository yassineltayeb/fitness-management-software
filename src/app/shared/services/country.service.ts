import { KeyValuePairs } from './../models/key-value-pairs.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private baseUrl: string = environment.baseUrl + 'countries';

  constructor(private http: HttpClient) { }

  getCountries(): Observable<KeyValuePairs[]> {
    return this.http.get<KeyValuePairs[]>(this.baseUrl);
  }
}
