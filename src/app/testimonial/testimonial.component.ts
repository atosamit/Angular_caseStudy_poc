import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent  implements OnInit{
  data3: any;

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
    query{
      testimonials(id:"2sOPT6bdaPAWoysfKdnYdF"){
       heading
       image{
         url
       }
       title
       description
       author
       authorDescription
     }
     }
     `;

    this.http.post(endpoint, { query }, { headers }).subscribe(
      (response: any) => {
        this.data3 = response.data.testimonials;
        console.log(this.data3)
      },
      (error: any) => {
        console.error('Error while fetching Contentful data', error);
      }
    );
  }
}
