import { Component, OnInit } from '@angular/core';
import { labelConstants } from '../HardcodeTags';
import { UserDataService } from '../user-data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSelectChange } from '@angular/material/select';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit  {
  labelConstants = labelConstants;
    // data call through CMS
    contents: any[] = [];
  ngOnInit() {
    this.fetchData();
  }
  constructor(private userData:UserDataService,private http: HttpClient){}

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
          details {
            sys{
              id
            }
            title
          }
        }
      }
  }
    `;

    this.http.post(endpoint, { query }, { headers }).subscribe(
      (response: any) => {
        this.contents = response.data.domainCollection.items;
       console.log(this.contents)
        

      },
      (error: any) => {
        console.error('Error while fetching Contentful data', error);


      }
    );
  }
 

  


  // getUserFormData(data:any){
  //   console.log(data)
  //   this.userData.saveUser(data).subscribe((result)=>{
  //   console.log(result)
  //   })
  // }
  


  getUserFormData(data: any) {
    
    // Generate an autogenerated password (you can customize this as needed)
    const autogeneratedPassword = this.generateRandomPassword();

    // Add the autogenerated password to the user data
    const userDataWithPassword = { ...data, password: autogeneratedPassword };

    console.log(userDataWithPassword);

    // Save the user data with the autogenerated password
    this.userData.saveUser(userDataWithPassword).subscribe((result) => {
      console.log(result);
    });
  }

  private generateRandomPassword(length: number = 8): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(randomIndex);
    }

    return password;
  }
}
