import { Component, HostListener } from '@angular/core';
import { labelConstants } from './HardcodeTags';
import { ErrorService } from './error.service';
import { Router } from '@angular/router';
import { flatMap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cxEvidenPortal';
  isScreenSizeSmallOrLarge = false;
  labelConstants = labelConstants ;
  isAuthenticated! : boolean;


  constructor(public errorService: ErrorService,private router: Router) {
    // Initialize the value based on initial screen size
    this.updateScreenSizeFlag();
  }

  ngOnInit() {
    // Retrieve the authentication flag from session storage
    const isAuthenticate = sessionStorage.getItem('isAuthenticate');
    if(isAuthenticate == 'true'){
         this.isAuthenticated = true ;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateScreenSizeFlag();
  }

  private updateScreenSizeFlag() {
    const screenWidth = window.innerWidth;
    this.isScreenSizeSmallOrLarge = screenWidth < 350 || screenWidth > 2590;
  }
  
//  isAuthenticated : boolean = false;

}

