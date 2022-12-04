import { AuthService } from 'src/app/shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: string = "";

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
  }

}
