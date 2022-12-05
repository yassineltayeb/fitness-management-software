import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { NgModule } from "@angular/core";
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    HomeComponent,
    SideMenuComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule
  ],
  exports: [
    HomeComponent,
    SideMenuComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class SharedModule {

}
