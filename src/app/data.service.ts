import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data: any[] = [];
  private filteredData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private domains: string[] = [];

  constructor() {}

  setData(data: any[]): void {
    this.data = data;
    this.filteredData.next(data);
    this.domains = this.getUniqueDomains(data);
  }

  getData(): Observable<any[]> {
    return this.filteredData.asObservable();
  }

  filterDataByDomain(domain: string): void {
    if (domain === 'all') {
      this.filteredData.next(this.data);
    } else {
      const filtered = this.data.filter(item => item.domain === domain);
      this.filteredData.next(filtered);
    }
  }

  getUniqueDomains(data: any[]): string[] {
    const uniqueDomains = new Set<string>();
    data.forEach(item => uniqueDomains.add(item.domain));
    return Array.from(uniqueDomains);
  }
}
