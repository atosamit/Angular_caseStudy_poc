import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-resize-example',
  templateUrl: './resize-example.component.html',
  styleUrls: ['./resize-example.component.css']
})
export class ResizeExampleComponent {
  isSmallScreen = false;

 

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

 

  constructor() {
    this.checkScreenSize();
  }

 

  private checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 350;
  }
}
