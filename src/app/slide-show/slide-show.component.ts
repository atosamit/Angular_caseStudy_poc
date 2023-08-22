import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.css']
})

export class SlideShowComponent implements OnInit {
  slideIndex = 0;
  totalSlides!: number;
  data1: any;
  isSlideshowRunning = false;




  constructor(private http: HttpClient) { }
  ngOnInit(): void {

    this.totalSlides = document.getElementsByClassName('mySlides').length;
    this.startSlideshow();
    this.fetchData();
  }

  onSearchClick() {
    // Implement your search logic here
    alert("Want to search?")
    console.log('Search button clicked!');
    // You can add your search functionality here, like calling a service or updating the component's data
  }
  startSlideshow(): void {
    this.isSlideshowRunning = true;
    this.showSlides();
  }
  stopSlideshow(): void {
    this.isSlideshowRunning = false;
  }
  showSlides(): void {
    if (!this.isSlideshowRunning) {
      return;
    }
    const slides = document.getElementsByClassName('mySlides') as HTMLCollectionOf<HTMLElement>;
    const dots = document.getElementsByClassName('dot') as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    this.slideIndex++;
    if (this.slideIndex > this.totalSlides) {
      this.slideIndex = 1;
    }
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' active', '');
    }
    slides[this.slideIndex - 1].style.display = 'block';
    dots[this.slideIndex - 1].className += ' active';
    setTimeout(() => this.showSlides(), 2000); // Change image every 2 seconds
  }
  fetchData() {
    const endpoint = 'https://graphql.contentful.com/content/v1/spaces/40jcljdzym6w';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer OhON6XBAeZ0LHmYy0hlxfv_wPFAtYwSzuhjdLR991XU'
    });
    const query = `
    query {
      bannerCollection {
        items {
          image {
            url
          }
          text1
          text2
          text3
      }
    }
    }
  `;
    this.http.post(endpoint, { query }, { headers }).subscribe(
      (response: any) => {
        this.data1 = response.data.bannerCollection.items;
        console.log(this.data1)
      },
      (error: any) => {
        console.error('Error while fetching Contentful data', error);
      }
    );
  }


enteredSearchValue: string = '';

@Output()
// created a custom event
searchTextChanged: EventEmitter<string> = new EventEmitter<string>(); 

onSearchTextChanged(){
  this.searchTextChanged.emit(this.enteredSearchValue)
}

}


