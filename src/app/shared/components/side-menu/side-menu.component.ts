import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  sidebarToggle: boolean = false;
  constructor() { }

  ngOnInit() {

  }

  toggleSidebar() {
    this.sidebarToggle = !this.sidebarToggle;
    console.log(this.sidebarToggle);
  }

}
