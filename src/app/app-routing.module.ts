import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { ClipsComponent } from './clips/clips.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { SignupComponent } from './signup/signup.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';

const routes: Routes = [
  {
    path:'home',component:HomeComponent,canActivate:[AuthGuard]
  },
  {
    path:'',component:LoginComponent
  },
  {
    path:'signup',component:SignupComponent
  },
  {
    path:'forgot-password', component:ForgotPasswordComponent
  },
  {
    path:'clips', component:ClipsComponent
  },
  {
    path:'privacy', component:PrivacyComponent
  },
  {
    path:'tand-c', component:TermsConditionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
