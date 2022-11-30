import { CommonModule } from '@angular/common';
import { SignupComponent } from './components/signup/signup.component';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/login/login.component';
import { LoggedInAuthGuardService } from 'src/app/core/guards/loggedIn-auth-guard.service';

const authRoutes: Route[] = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', component: LoginComponent, canActivate: [LoggedInAuthGuardService] },
      { path: 'signup', component: SignupComponent, canActivate: [LoggedInAuthGuardService] }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
