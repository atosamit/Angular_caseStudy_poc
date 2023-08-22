import { Component } from '@angular/core';
import { CsvDownloadService } from '../csv-download.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  constructor(private csvDownloadService:  CsvDownloadService) {}

  
}
