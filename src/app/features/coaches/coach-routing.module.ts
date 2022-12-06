import { CoachesClassesComponent } from './components/coaches-classes/coaches-classes.component';
import { CoachProfileComponent } from './components/coach-profile/coach-profile.component';
import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CoachProfileResolver } from './resolvers/coach-profile-resolver.service';

const coachRoutes: Route[] = [
  {
    path: ':coachId/profile',
    component: CoachProfileComponent,
    resolve: { coach: CoachProfileResolver }
  },
  {
    path: ':coachId/classes',
    component: CoachesClassesComponent,
    resolve: { coach: CoachProfileResolver }
  }
];

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forChild(coachRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CoachRoutingModule {
}
