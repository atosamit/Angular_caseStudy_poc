import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-testing1',
  templateUrl: './testing1.component.html',
  styleUrls: ['./testing1.component.css']
})
export class Testing1Component {
//   isGridView: boolean = true;
  

//   listView() {
//     const elements = document.getElementsByClassName('column');
//     for (let i = 0; i < elements.length; i++) {
//       elements[i].setAttribute('style', 'width: 100%' );
//     }
//     this.isGridView = false;
//   }

//   gridView() {
//     const elements = document.getElementsByClassName('column');
//     for (let i = 0; i < elements.length; i++) {
//       elements[i].setAttribute('style', '');
//     }
//     this.isGridView = true;
//   }

  // data call through CMS
  // selectedDomain: any;
  // selectedSubDomain: any;
  // data1: any[] = [];
  // filteredData: any[] = [];
  // filteredSubDomains: any[] = [];
  // filterData:any;

//   constructor(private http: HttpClient) { }
  
//   ngOnInit() {
//     this.fetchData();
//   }
//   fetchData() {
//     const endpoint = 'https://graphql.contentful.com/content/v1/spaces/40jcljdzym6w';
//     const headers = new HttpHeaders({
//       'Content-Type': 'application/json',
//       Authorization: 'Bearer OhON6XBAeZ0LHmYy0hlxfv_wPFAtYwSzuhjdLR991XU'
//     });
//     const query = `
//     query {
//       domainCollection {
//         items {
//           domain
//           subDomain
//           details {
//             sys{
//               id
//             }
//             itemIcon {
//               url
//             }
//             title
//             description
//             publishedOn
//           }
//         }
//       }
//     }
//     `;

//     this.http.post(endpoint, { query }, { headers }).subscribe(
//       (response: any) => {
//         this.data1 = response.data.domainCollection.items;
//         this.filterData();
//         console.log(this.data1)
//       },
//       (error: any) => {
//         console.error('Error while fetching Contentful data', error);
//       }
//     );
//   }

  // filterData() {
  //   this.filteredData = this.data1;
  //   console.log(this.selectedDomain);
    
  //   if (this.selectedDomain) {
  //     this.filteredData = this.filteredData.filter((card) => card.domain === this.selectedDomain);
  //   }
  //   this.filteredSubDomains = this.filteredData;
  //   if (this.selectedSubDomain) {
  //     this.filteredSubDomains = this.filteredSubDomains.filter((card) => card.subDomain === this.selectedSubDomain);
  //   }
  // }

 

  // handleDomainFilter(domain: any) {
  //   this.selectedDomain = domain;
  //   this.selectedSubDomain = null;
  //   this.filterData();
  // }

 

  // handleSubDomainFilter(subDomain: any) {
  //   this.selectedSubDomain = subDomain;
  //   this.filterData();
  // }

 

  // handleShowAll() {
  //   this.selectedDomain = null;
  //   this.selectedSubDomain = null;
  //   this.filterData();
  // }


// dropdownOpen: boolean = false;
//   toggleDropdown() {
//     this.dropdownOpen = !this.dropdownOpen;
//   }


  
  isGridView: boolean = true;
  

  listView() {
    const elements = document.getElementsByClassName('column');
    for (let i = 0; i < elements.length; i++) {
      elements[i].setAttribute('style', 'width: 100%' );
    }
    this.isGridView = false;
  }

  gridView() {
    const elements = document.getElementsByClassName('column');
    for (let i = 0; i < elements.length; i++) {
      elements[i].setAttribute('style', '');
    }
    this.isGridView = true;
  }

  // data call through CMS
  data: any[] = [];
  filteredData: any[] = []; // Filtered data based on selected domain
  domains: string[] = []; // List of unique domains
  filteredData1: any[] = []; // Filtered data based on selected subdomain

  constructor(private http: HttpClient) { }
  
  ngOnInit() {
    this.fetchData();
  }
  fetchData() {
    const endpoint = 'https://graphql.contentful.com/content/v1/spaces/40jcljdzym6w';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer OhON6XBAeZ0LHmYy0hlxfv_wPFAtYwSzuhjdLR991XU'
    });
    const query = `
    query {
      domainCollection {
        items {
          domain
          subDomain
          details {
            sys{
              id
            }
            itemIcon {
              url
            }
            title
            description
            publishedOn
          }
        }
      }
    }
    `;

    this.http.post(endpoint, { query }, { headers }).subscribe(
      (response: any) => {
        this.data = response.data.domainCollection.items;
        this.filteredData = [...this.data]; // Initialize filteredData with all data
        this.filteredData1 = [...this.filteredData]; // Initialize filteredData with all data
        this.domains = this.getUniqueDomains(this.data); // Get unique domains
        console.log(this.data)
      },
      (error: any) => {
        console.error('Error while fetching Contentful data', error);
      }
    );
  }

  getUniqueDomains(data: any[]): string[] {
    const uniqueDomains = new Set<string>();
    data.forEach(item => uniqueDomains.add(item.domain));
    return Array.from(uniqueDomains).reverse();
  }

  filterDataByDomain(domain: string) {
    if (domain === 'All') {
      this.filteredData = [...this.data]; // Show all data
    } else {
      this.filteredData = this.data.filter(item => item.domain === domain); // Filter data based on selected domain
    }
  }

  filterDataBySubDomain(subDomain: string) {
    if (subDomain === '') {
      this.filteredData1 = [...this.filteredData]; // Show all filtered data
    } else {
      this.filteredData1 = this.filteredData.filter(item => item.subDomain === subDomain); // Filter data based on selected subdomain
    }
    alert("You clicked the button!")
  }



  selectedTabIndex: number = 0; // Default selected tab index
  handleTabChange(event: MatTabChangeEvent): void {
  const selectedDomain = event.tab.textLabel;
  this.filterDataByDomain(selectedDomain);
}


dropdownOpen: boolean = false;
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
 
}
