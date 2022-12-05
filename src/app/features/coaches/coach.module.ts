import { CoachesClassesComponent } from './../coaches-classes/coaches-classes.component';
import { CoachProfileComponent } from './components/coach-profile/coach-profile.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachRoutingModule } from './coach-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    CoachProfileComponent,
    CoachesClassesComponent
  ],
  imports: [
    CommonModule,
    CoachRoutingModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  exports: [
    CoachProfileComponent,
    CoachesClassesComponent
  ]
})
export class CoachModule { }
