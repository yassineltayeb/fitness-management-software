import { HomeComponent } from './shared/components/home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard.service';
import { LoggedInAuthGuardService } from './core/guards/loggedIn-auth-guard.service';

const appRoute: Route[] = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
    canActivate: [LoggedInAuthGuardService]
  },
  {
    path: 'coach',
    loadChildren: () => import('./features/coaches/coach.module').then(m => m.CoachModule),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoute)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
