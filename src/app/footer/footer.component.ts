import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {


  // data call through CMS
  data: any;

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
     footer(id:"7EVaQeBvl0SRmK211MH2Hm"){
     footer
   }
 }
    `;

    this.http.post(endpoint, { query }, { headers }).subscribe(
      (response: any) => {
        this.data = response.data.footer;
        console.log(this.data)
      },
      (error: any) => {
        console.error('Error while fetching Contentful data', error);
      }
    );
  }
}
