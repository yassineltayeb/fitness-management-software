import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceTsService {
  isLoginMode = new Subject<boolean>();

  constructor() { }
}
