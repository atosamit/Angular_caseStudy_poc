import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private isError = false;

  setIsError(value: boolean) {
    this.isError = value;
  }

  getIsError() {
    return this.isError;
  }
}
