import { KeyValuePairs } from './../models/key-value-pairs.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private baseUrl: string = environment.baseUrl + 'cities';

  constructor(private http: HttpClient) { }

  getCities(countryId: number): Observable<KeyValuePairs[]> {
    return this.http.get<KeyValuePairs[]>(this.baseUrl, {
      params: new HttpParams().set('countryId', countryId)
    });
  }
}
