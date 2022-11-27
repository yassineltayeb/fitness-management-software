import { ChangeDetectorRef, Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../../services/auth.service.ts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {

  constructor(
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.authService.isLoginMode.next(true);
  }

  onSignUp() {
    this.authService.isLoginMode.next(false);
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }
}
