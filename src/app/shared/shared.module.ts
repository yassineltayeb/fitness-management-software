import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { NgModule } from "@angular/core";
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    HomeComponent,
    SideMenuComponent,
  ], imports: [
    CommonModule
  ],
  exports: [
    HomeComponent,
    SideMenuComponent
  ]
})
export class SharedModule {

}
