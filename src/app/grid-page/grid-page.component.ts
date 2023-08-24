
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { CsvDownloadService } from '../csv-download.service';
import { LikesService } from '../services/likes.service';
import { jsPDF } from "jspdf"

@Component({
  selector: 'app-grid-page',
  templateUrl: './grid-page.component.html',
  styleUrls: ['./grid-page.component.css']
})
export class GridPageComponent implements OnInit {
  @ViewChild('content', { static: false }) el!: ElementRef;

  isGridView: boolean = true;

  isListViewActive = false; // Initially set to list view
  sortBy: any[] = [];
  logoCollection: any[]=[];
  domainCollection: any[]=[];

  toggleView(view: 'list' | 'grid') {
    if (view === 'list') {
      this.isListViewActive = true;
    } else if (view === 'grid') {
      this.isListViewActive = false;
    }
  }

  listView() {
    const elements = document.getElementsByClassName('column');
    for (let i = 0; i < elements.length; i++) {
      elements[i].setAttribute('style', 'width: 100%');
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
  // Initialize an empty search text
  currentPage: number = 1;
  itemsPerPage: number = 6;

  selectedDomain: string | null = null;
  selectedSubDomain: string | null = null;





  constructor(private http: HttpClient, private csvDownloadService: CsvDownloadService, private likesService: LikesService) {
    this.likesCount = this.likesService.getLikesCount(this.contentId);

  }

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
            publishedOnDate
          }
        }
      }
      sortByCollection{
        items{
          list
        }
      }
    
    logoCollection{
      items{
          logo{
            url
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
        this.sortBy = response.data.sortByCollection.items;
        this.logoCollection = response.data.logoCollection.items;

        // domain and sub domains toggle
this.domainCollection = response.data.domainCollection.items;


        console.log(this.data)
      },
      (error: any) => {
        console.error('Error while fetching Contentful data', error);
      }
    );
  }
  // for domain dynamic
  getUniqueDomains(data: any[]): string[] {
    const uniqueDomains = new Set<string>();
    data.forEach(item => uniqueDomains.add(item.domain));
    return Array.from(uniqueDomains).reverse();
  }
  selectedTabIndex: number = 0; // Default selected tab index
  handleTabChange(event: MatTabChangeEvent): void {
    const selectedDomain = event.tab.textLabel;
    this.filterDataByDomain(selectedDomain);
  }



  filterDataByDomain(domain: string): void {
    if (domain === 'All') {
      this.filteredData = [...this.data]; // Show all data
      this.selectedDomain = null; // Reset selected domain
      this.selectedSubDomain = null; // Reset selected subdomain
      this.filteredData1 = [...this.filteredData]; // Reset filtered subdomain data
    } else {
      this.filteredData = this.data.filter(item => item.domain === domain); // Filter data based on selected domain
      this.selectedDomain = domain; // Update selected domain
      this.selectedSubDomain = null; // Reset selected subdomain
      this.filteredData1 = [...this.filteredData]; // Reset filtered subdomain data
    }
  }



  filterDataBySubDomain(subDomain: string): void {
    if (subDomain === '') {
      this.filteredData1 = [...this.filteredData]; // Show all filtered data
      this.selectedSubDomain = null; // Reset selected subdomain
    } else {
      this.filteredData1 = this.filteredData.filter(item => item.subDomain === subDomain); // Filter data based on selected subdomain
      this.selectedSubDomain = subDomain; // Update selected subdomain
    }

  }

  dropdownOpen: boolean = false;
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  shareFile() {
    alert(" Do you want to share file?")
  }


  // download button fn
  downloadCSVFile() {
    alert("Downloaded Successfully!")
    const csvData = this.convertToCSV(this.data);
    const filename = 'data.csv';
    this.csvDownloadService.downloadCSV(csvData, filename);

  }
  private convertToCSV(data: any[]): string {
    const separator = ','; // You can change the separator to ';' if you prefer.
    const keys = Object.keys(data[0]);

    // Generate the header row
    let csv = keys.join(separator) + '\n';

    // Generate rows
    data.forEach((item) => {
      const row = keys.map((key) => item[key]).join(separator);
      csv += row + '\n';
    });

    return csv;
  }

  // Share page implemention (using)

  @ViewChild('popupContent', { static: false }) popupContent!: ElementRef;

  // ... other properties and methods ...

  showPopup: boolean = false;

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }
  handleEmailShare(id: string): void {
    const shareUrl = `http://localhost:55020/case_study/${id}`; // Replace this with the actual URL of the content you want to share
    const subject = "Check out this content!";
    const body = `Hey, I found this interesting content: ${shareUrl}`;
    const mailToLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Open the default email client with the pre-filled subject and body
    window.location.href = mailToLink;
    this.closePopup();
  }
  handleLinkedInSharee(id: string): void {
    const shareUrl = `http://localhost:55020/case_study/${id}`; // Replace this with the actual URL of the content you want to share
    const title = "Check out this content!";
    const summary = "Hey, I found this interesting content:";
    const source = "Your Source Here"; // Optional: Add the source of the content

    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(summary)}&source=${encodeURIComponent(source)}`;

    // Open the LinkedIn sharing dialog
    window.open(linkedInShareUrl, '_blank');
    this.closePopup();
  }

  // for download pdf

  // downloadPDF(id: string) {
  //   const apiUrl = `http://localhost:4200/case_study/${id}`;

  //   this.http.get(apiUrl, { responseType: 'arraybuffer' }).subscribe(
  //     (response: ArrayBuffer) => {
  //       const blob = new Blob([response], { type: 'application/pdf' });
  //       const url = window.URL.createObjectURL(blob);

  //       const a = document.createElement('a');
  //       a.href = url;
  //       a.download = `case_study_${id}.pdf`;
  //       document.body.appendChild(a);
  //       a.click();

  //       window.URL.revokeObjectURL(url);
  //       document.body.removeChild(a);
  //     },
  //     error => {
  //       console.error('Error generating PDF:', error);
  //     }
  //   );
  // }
 

  
    // Toggle the like status
   
  
  contentId = '${sys.id}'; // Replace with the actual content ID
  userId = '40jcljdzym6w'; // Replace with the actual user ID
  likesCount = 0;
  comment = '';
  comments: { userId: string; comment: string }[] = [];
  newComment: string = '';


  makePDF() {
    let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save("tasteCase.pdf");
      }
    });

  }



  toggleLike(contentId: string, userId: string): void {
    this.likesService.handleLike(contentId, userId);
    this.likesCount = this.likesService.getLikesCount(contentId);
  }



  // Function to perform the search

  searchText: string = '';
  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
    console.log(this.searchText)
  }


  addComment(contentId: string, userId: string, commentText: string): void {

    this.likesService.handleComment(contentId, userId, commentText);

    this.comments = this.likesService.getComments(this.contentId);

  }

  get paginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredData1.slice(startIndex, endIndex);
  }
  changePage(change: number) {
    this.currentPage += change;
  }
  get totalPages() {
    return Math.ceil(this.filteredData1.length / this.itemsPerPage);
  }
}


