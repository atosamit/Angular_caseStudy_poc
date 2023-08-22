import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-browers-size',
  templateUrl: './browers-size.component.html',
  styleUrls: ['./browers-size.component.css']
})
export class BrowersSizeComponent  implements OnInit, OnDestroy  {
  showWarning: boolean = false;

  ngOnInit() {
    this.checkBrowserSizeCompatibility();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkBrowserSizeCompatibility();
  }

  checkBrowserSizeCompatibility() {
    const windowWidth = window.innerWidth;
    this.showWarning = windowWidth < 500 || windowWidth > 1024;
  }

  ngOnDestroy() {
    // Clean up the event listener when the component is destroyed
    window.removeEventListener('resize', this.onResize);
  }
}
