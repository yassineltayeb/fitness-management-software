import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  title: string = 'Login';

  constructor() { }

  ngOnInit(): void {

  }

  onToggleAuthMode(authMode: boolean) {
    this.isLoginMode = authMode;
    this.isLoginMode ? this.title = 'Login' : this.title = 'Signup';
  }
}
