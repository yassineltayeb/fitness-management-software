import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service.ts.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, AfterViewInit {
  isLoginMode: boolean = true;
  title: string = 'Login';

  constructor(private authService: AuthService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.authService.isLoginMode.subscribe((isLoginMode: boolean) => {
      this.isLoginMode = isLoginMode;
      console.log('changed to ', this.isLoginMode);
    });
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  onToggleAuthMode(authMode: boolean) {
    this.isLoginMode = authMode;
    this.isLoginMode ? this.title = 'Login' : this.title = 'Signup';
  }
}
