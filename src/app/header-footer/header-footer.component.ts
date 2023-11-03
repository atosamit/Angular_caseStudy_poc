import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
// import { AuthService } from '@auth0/auth0-angular';


@Component({
  selector: 'app-header-footer',
  templateUrl: './header-footer.component.html',
  styleUrls: ['./header-footer.component.css']
})
export class HeaderFooterComponent   {
  @Input() shouldShowHeader = true;
   // data call through CMS
   data: any;
  router: any;
  
  //  constructor(private http: HttpClient, public auth: AuthService ,  @Inject(DOCUMENT) public document: Document,)
   constructor(private http: HttpClient,    @Inject(DOCUMENT) public document: Document,) { }
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
      header(id:"21sWfPAurxL9YkztxxKqky"){
        logo{    
         url    
        }    
        logo1{     
          url    
        }    
        logo2{     
          url     
        }
      }
  }
     `;
 
     this.http.post(endpoint, { query }, { headers }).subscribe(
       (response: any) => {
         this.data = response.data.header;
         console.log(this.data)
       },
       (error: any) => {
         console.error('Error while fetching Contentful data', error);
       }
     );
   }

   logout() {
    console.log('Logout button clicked');    
  
    // You can also navigate the user to the login page if needed
     this.router.navigate(['/login']);
    window.location.reload()
    // Clear the session storage
    sessionStorage.clear();

    // Set isAuthenticated to false
    sessionStorage.setItem('isAuthenticated', 'false');

  }
  
}
