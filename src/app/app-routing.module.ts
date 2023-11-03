import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsPageComponent } from './details-page/details-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { GridPageComponent } from './grid-page/grid-page.component';


const routes: Routes = [
  { path: '', redirectTo: '/grid-page', pathMatch: 'full' },
  // { path: 'login', component: LoginComponent },
  { path: 'grid-page', component: GridPageComponent },
  { path: "case_study/:id", component: DetailsPageComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'landing-page', component: LandingPageComponent },
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}