import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsPageComponent } from './details-page/details-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
// import { LoginuserComponent } from './loginuser/loginuser.component';

const routes: Routes = [
  // { path: '', redirectTo: '/loginuser', pathMatch: 'full' },
  { path: 'grid-page', component: LandingPageComponent },
  { path: 'case_study/:id', component: DetailsPageComponent },
  { path: 'error', component: ErrorComponent },
  // { path: 'loginuser', component: LoginuserComponent },
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}