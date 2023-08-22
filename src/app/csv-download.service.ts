import { Injectable } from '@angular/core';




@Injectable({
  providedIn: 'root'
})
export class CsvDownloadService {

  constructor() { }

  downloadCSV(csvContent: string, filename: string) {
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
// serach
  
}
