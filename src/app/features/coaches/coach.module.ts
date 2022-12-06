import { CoachesClassesComponent } from './components/coaches-classes/coaches-classes.component';
import { CoachProfileComponent } from './components/coach-profile/coach-profile.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachRoutingModule } from './coach-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CoachesClassesListComponent } from './components/coaches-classes-list/coaches-classes-list.component';

@NgModule({
  declarations: [
    CoachProfileComponent,
    CoachesClassesComponent,
    CoachesClassesListComponent
  ],
  imports: [
    CommonModule,
    CoachRoutingModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  exports: [
    CoachProfileComponent,
    CoachesClassesComponent,
    CoachesClassesListComponent
  ]
})
export class CoachModule { }
