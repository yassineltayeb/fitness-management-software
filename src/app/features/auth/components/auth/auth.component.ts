import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserType } from 'src/app/core/enums/user-type.enum';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, AfterViewInit {
  userType: UserType = 1;
  title: string = 'Login';

  constructor(private authService: AuthService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.authService.isLoginMode.subscribe((isLoginMode: boolean) => {
      // this.isLoginMode = isLoginMode;
    });
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  onToggleUserType(userType: UserType) {
    this.userType = userType;
    this.authService.userType.next(userType);
  }
}
