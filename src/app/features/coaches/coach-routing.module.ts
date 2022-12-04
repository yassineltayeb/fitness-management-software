import { CoachProfileComponent } from './components/coach-profile/coach-profile.component';
import { Route, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CoachProfileResolver } from './resolvers/coach-profile-resolver.service';

const coachRoutes: Route[] = [
  { path: ':coachId/profile', component: CoachProfileComponent, resolve: { coach: CoachProfileResolver } }
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
