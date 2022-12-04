import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  sidebarToggle: boolean = false;
  constructor(
    private commonService: CommonService,
    private authService: AuthService
  ) { }

  ngOnInit() {

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
