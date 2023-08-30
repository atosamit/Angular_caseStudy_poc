import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlideShowComponent } from './slide-show/slide-show.component';
import { GridPageComponent } from './grid-page/grid-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
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
import { Testing1Component } from './testing1/testing1.component';
import { RenderingComponent } from './rendering/rendering.component';
import { HeaderFooterComponent } from './header-footer/header-footer.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { ResizeExampleComponent } from './resize-example/resize-example.component';
import { MatButtonModule } from '@angular/material/button';





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
    Testing1Component,
    RenderingComponent,
    ResizeExampleComponent,
    
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
