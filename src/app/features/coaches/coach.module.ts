import { CoachesClassesGridComponent } from './components/coaches-classes-grid/coaches-classes-grid.component';
import { CoachesClassesComponent } from './components/coaches-classes/coaches-classes.component';
import { CoachProfileComponent } from './components/coach-profile/coach-profile.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachRoutingModule } from './coach-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CoachesClassesListComponent } from './components/coaches-classes-list/coaches-classes-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastModule } from 'primeng/toast';
import { PaginatorModule } from 'primeng/paginator';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { CoachesClassesFormComponent } from './components/coaches-classes-form/coaches-classes-form.component';

@NgModule({
  declarations: [
    CoachProfileComponent,
    CoachesClassesComponent,
    CoachesClassesListComponent,
    CoachesClassesGridComponent,
    CoachesClassesFormComponent
  ],
  imports: [
    CommonModule,
    CoachRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
    ToastModule,
    PaginatorModule,
    DynamicDialogModule
  ],
  exports: [
    CoachProfileComponent,
    CoachesClassesComponent,
    CoachesClassesListComponent,
    CoachesClassesGridComponent,
    CoachesClassesFormComponent
  ]
})
export class CoachModule { }
