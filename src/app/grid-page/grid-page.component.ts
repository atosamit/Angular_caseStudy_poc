
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { LikesService } from '../services/likes.service';
// import { jsPDF } from "jspdf"
import { labelConstants } from '../HardcodeTags';
import { Router } from '@angular/router'; // Import the Router module
import { Store } from '@ngrx/store';
import { ErrorService } from '../error.service';
// import { decrement, increment, } from 'src/app/store/counter.actions';
import { decrement,increment } from 'src/store/counter.actions';
import { CommentService } from '../services/comment.service';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-grid-page',
  templateUrl: './grid-page.component.html',
  styleUrls: ['./grid-page.component.css','./grid-page.css']
})
export class GridPageComponent implements OnInit {
  response: { message: string; } | undefined;
  
  @ViewChild('content', { static: false }) el!: ElementRef;

  // contentId: string = '7a3t4QUm9Yq0GsjlSPqsuT';
  
  

   
  fetchedComments: string[] = []; 

  isGridView: boolean = true;
  // all hard present here
  labelConstants = labelConstants;
  isListViewActive = false; // Initially set to list view
  sortBy: any[] = [];
  logoCollection: any[] = [];
  domainCollection: any[] = [];
  isIncrementing: any;
  


  //comments
  comment = '';
  comments: { userId: string; comment: string }[] = [];
  isCommentBoxOpen: boolean = false;
  itemCommentBoxStates: { [key: string]: boolean } = {};
  
  //like

  //black icon
  // likedIcon = 'https://www.gstatic.com/images/icons/material/system/1x/thumb_up_black_24dp.png';
  // notLikedIcon = 'https://www.gstatic.com/images/icons/material/system/1x/thumb_up_off_alt_black_24dp.png';
   
  //orange icon
  likedIcon = 'https://th.bing.com/th/id/R.59bb1857523a6ab9a363f0ffae12471e?rik=0%2fHvONgjAfHDWw&riu=http%3a%2f%2fwww.clker.com%2fcliparts%2f5%2fS%2ff%2fH%2fQ%2fT%2forange-thumb-like.svg.hi.png&ehk=kuWZO2rvkVoKZ92qQovZRzTb0GfLeVeaHZEWIS8EmUM%3d&risl=&pid=ImgRaw&r=0';
  notLikedIcon = 'https://th.bing.com/th/id/OIP.KnvekyV7OUuJbWuk3j3xNQHaGn?w=1604&h=1432&rs=1&pid=ImgDetMain';
  
  isContentLiked: boolean = false;
  likedCounts: Map<string, number> = new Map<string, number>();
  likedStatusMap: Map<string, boolean> = new Map<string, boolean>();
  likeCountMap: Map<string, number> = new Map<string, number>();

 
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
    const email = sessionStorage.getItem('userEmail');
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
  cxTower: string[] = []; // List of unique cxTower
  cxTech: string[] = []; // List of unique cxTech
  filteredData1: any[] = []; // Filtered data based on selected subdomain
  // Initialize an empty search text
  currentPage: number = 1;
  itemsPerPage: number = 9;

  selectedDomain: string | null = null;
  selectedSubDomain: string | null = null;
  userEmail: string | null = sessionStorage.getItem('userEmail');
  



  constructor(private cdr: ChangeDetectorRef,private commentService: CommentService, private errorService: ErrorService,private router: Router,private http: HttpClient, private likesService: LikesService,private store:Store<{counter:{counter:number}}>) {
    this.userEmail = sessionStorage.getItem('userEmail');
    // this.likesCount = this.likesService.getLikesCount(this.contentId);

  }
  
  
  
  counterdisplay!:number;
  ngOnInit() {
    this.fetchData();
    this.store.select('counter').subscribe(data=>{
      this.counterdisplay=data.counter;
      console.log(data.counter)
  
    })
    console.log(this.store)
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
          cxTech
          cxTower
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
        this.cxTower = this.getCxTower(this.data); // Get unique domains
        this.cxTech = this.getCxTech(this.data); // Get unique domains
        this.sortBy = response.data.sortByCollection.items;
        this.logoCollection = response.data.logoCollection.items;

        // domain and sub domains toggle
        this.domainCollection = response.data.domainCollection.items;


        console.log(this.data)
        console.log(this.cxTech)

        

      },
      (error: any) => {
        console.error('Error while fetching Contentful data', error);

// Set the error flag to true
this.errorService.setIsError(true);
       
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
    const selectedDomain = event.tab.textLabel.split(' ')[0]; // Remove the count from the label
    this.filterDataByDomain(selectedDomain);
  }
  getCxTower(data: any[]): string[] {
    const cxTower = new Set<string>();
    data.forEach(item => {
      if (item.cxTower !== null) {
        cxTower.add(item.cxTower);
      }
    });
    return Array.from(cxTower).reverse();
  }



  getCxTech(data: any[]): string[] {
    const cxTech = new Set<string>();
    data.forEach(item => {
      if (item.cxTech !== null) {
        cxTech.add(item.cxTech);
      }
    });
    return Array.from(cxTech).reverse();
  }




  getDomainCount(domain: string): number {
    if (domain === 'All') {
      return this.data.length;
    }
    return this.data.filter(item => item.domain === domain).length;
  }

  getDomainLabel(domain: string): string {
    const count = this.getDomainCount(domain);
    return `${domain} (${count})`;
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



  // Toggle the like status


  
 
 


  makePDF() {
    // let pdf = new jsPDF('p', 'pt', 'a4');
    // pdf.html(this.el.nativeElement, {
    //   callback: (pdf) => {
    //     pdf.save("tasteCase.pdf");
    //   }
    // });

  }



 


  // Function to perform the search

  searchText: string = '';
  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue;
    console.log(this.searchText)
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

  
  cancelComment(contentId: string) {
    // Reset the comment variable or perform any necessary action when cancel is clicked
    this.comment = ''; // Reset the comment input field
    this.toggleCommentBox(contentId); // Toggle the comment box if needed

    this.itemCommentBoxStates[contentId] = false;
  }


  // function to toggle between comment box
  
  toggleCommentBox(itemId: string) {
    this.itemCommentBoxStates[itemId] = !this.itemCommentBoxStates[itemId];
    
    if (this.itemCommentBoxStates[itemId]) {
      // Fetch comments when the comment box is opened
      this.fetchComments(itemId);
    }
  }
  
  postOrFetchComments(itemId: string) {
    if (this.comment) {
      // Post comment if there's content in the textarea
      this.submitComment(itemId);
    } else {
      // Fetch comments if there's no content in the textarea
      this.fetchComments(itemId);
    }
  }

  
  

  //function for posting the comment
  submitComment(contentId: string) {
    console.log(' contentId:', contentId); // Use the function parameter
    console.log('Debug: userId:', this.userEmail); // Use this.userEmail as userId
    console.log('Debug: this.comment:', this.comment);
  
    if (this.comment.trim() !== '') {
      if (this.userEmail !== null) {
        this.commentService.addComment(this.userEmail, this.comment, contentId).subscribe(
          (response) => {
            console.log('Comment posted successfully:', response);
            // Handle the success response here and log the entered comment
            console.log(`Comment "${this.comment}" posted successfully. ContentId: ${contentId}, UserId: ${this.userEmail}`);
            // Clear the comment input field after a successful submission
            this.comment = '';
          },
          (error) => {
            console.error('Error posting comment:', error);
          }
        );
      } else {
        console.error('UserEmail is null, cannot post a comment.');
      }
    } else {
      console.error('Comment is empty, cannot submit.');
    }
  }


  formattedComments: string = '';
  // Function to format comments for display in textarea
formatComments() {
  this.formattedComments = this.comments.map(comment => comment.comment).join('\n');
}

  showComments: boolean = false;
  currentContentId: string | null = null;
  // Function to fetch the comments
  fetchComments(contentId: string) {
    this.showComments = !this.showComments; // Toggle the flag on button click
    this.currentContentId = contentId;

    if (this.showComments) {
      this.commentService.getComments(contentId).subscribe(
        (data: any) => {
          if (
            data &&
            data.comments &&
            Array.isArray(data.comments) &&
            this.currentContentId === contentId
          ) {
            this.comments = data.comments.map((comment: any) => ({
              userId: '', // Add logic to get user ID if available
              comment: comment.text
            }));
            console.log('Comments fetched successfully:', this.comments);
          } else {
            console.error('Invalid comments data received or content changed:', data);
          }
        },
        (error) => {
          console.error('Error fetching comments:', error);
        }
      );
    } else {
      this.comments = []; // If comments are hidden, clear the comments array
    }
  }


 
//function to post the like

// Function to retrieve saved like status from localStorage
retrieveLikedStatus(contentId: string): boolean {
  const status = localStorage.getItem(contentId);
  return status === 'true'; // Return the stored status as a boolean
}


initializeLikedStatus(contentId: string) {
  // Assuming contentIds are unique identifiers for each item
  this.likedStatusMap.set(contentId, false); // Initialize all items as not liked initially
}

submitLike(contentId: string) {
  const userId = this.userEmail;
  if (userId) {
    // Check if liked status for the content exists in the map, if not, initialize it to false
    if (!this.likedStatusMap.has(contentId)) {
      this.likedStatusMap.set(contentId, false);
    }

    // Use the content's specific liked status from the map
    const isContentLiked = this.likedStatusMap.get(contentId);

    this.commentService.addLike(userId, contentId).subscribe(
      (response) => {
        if (response && response.hasOwnProperty('message')) {
          if (response.message === 'You have already liked this content') {
            console.log('Already Liked:', response.message);
            if (isContentLiked) {
              this.likedStatusMap.set(contentId, false); // Update liked status to false
              this.likeCountMap.set(contentId, (this.likeCountMap.get(contentId) || 0) - 1); // Decrease like count
              console.log('Like count after unlike:', this.likeCountMap.get(contentId)); // Log count after like // Log count after unlike
              localStorage.setItem(contentId, 'false'); // Save the status to localStorage
            }
          } else if (response.message === 'Content liked successfully') {
            console.log('Like added successfully:', response);
            console.log(`Content liked successfully. ContentId: ${contentId}, UserId: ${this.userEmail}`);
            this.likedStatusMap.set(contentId, true); // Update liked status to true
            this.likeCountMap.set(contentId, (this.likeCountMap.get(contentId) || 0) + 1); // Increase like count
            localStorage.setItem(contentId, 'true'); // Save the status to localStorage
            console.log('Like count after like:', this.likeCountMap.get(contentId)); // Log count after like // Log count after like
          } else {
            console.log('Unexpected Response:', response);
            // Handle unexpected response
          }
        } else {
          console.log('Unexpected Response Format:', response);
          // Handle unexpected response format
        }
      },
      (error) => {
        console.error('Error adding like:', error);
        // Handle error cases here
      }
    );
  } else {
    console.error('UserEmail is null, cannot submit a like.');
  }
}



  

}


