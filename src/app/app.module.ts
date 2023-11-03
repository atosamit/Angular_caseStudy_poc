import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlideShowComponent } from './slide-show/slide-show.component';
import { GridPageComponent } from './grid-page/grid-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { CaseStudyDetailsComponent } from './case-study-details/case-study-details.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { Testimonial2Component } from './testimonial2/testimonial2.component';
import { RouterModule } from '@angular/router';
// import { AuthModule } from '@auth0/auth0-angular';
import { LoginComponent } from './login/login.component';
import { HeaderFooterComponent } from './header-footer/header-footer.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ErrorComponent } from './error/error.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from 'src/store/counter.reducer';
import { UserManagementComponent } from './user-management/user-management.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginuserComponent } from './loginuser/loginuser.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderFooterComponent,
    SlideShowComponent,
    GridPageComponent,
    FooterComponent,
    CaseStudyDetailsComponent,
    LandingPageComponent,
    DetailsPageComponent,
    Testimonial2Component,
    LoginComponent,
    ErrorComponent,
    UserManagementComponent,
    LoginuserComponent,


  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    RouterModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    StoreModule.forRoot({ counter: counterReducer })



    // AuthModule.forRoot({
    //   domain: '',
    //   clientId: '',
    //   authorizationParams: {
    //     // redirect_uri: window.location.origin
    //   }
    // })


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
