import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from '../../models/user.model';
import { faHome, faUser, faSignOut, faPersonRunning, faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  sidebarToggle: boolean = false;
  currentUser = {} as User;
  faPersonRunning = faPersonRunning
  faHome = faHome
  faUser = faUser
  faSignOut = faSignOut
  faBars = faBars

  constructor(
    private commonService: CommonService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
  }

  toggleSidebar() {
    this.sidebarToggle = !this.sidebarToggle;
    this.commonService.sidebarToggled.next(this.sidebarToggle);
  }

  /* ----------------------------- Events handlers ---------------------------- */
  onSignOut() {
    this.authService.logout();
  }

}
