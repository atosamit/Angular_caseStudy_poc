import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cxEvidenPortal';
  isScreenSizeSmallOrLarge = false;

  constructor() {
    // Initialize the value based on initial screen size
    this.updateScreenSizeFlag();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateScreenSizeFlag();
  }

  private updateScreenSizeFlag() {
    const screenWidth = window.innerWidth;
    this.isScreenSizeSmallOrLarge = screenWidth < 300 || screenWidth > 2590;
  }
}
