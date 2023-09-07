import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  errorMessage: string | null = null;

  constructor(private route: ActivatedRoute) {
    // Retrieve the error message from the query parameter
    this.errorMessage = this.route.snapshot.queryParamMap.get('message');
}
}
