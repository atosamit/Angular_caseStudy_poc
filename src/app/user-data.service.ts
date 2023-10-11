import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserDataService {
url="http://172.19.113.4:3000/api/register";
  constructor(private http:HttpClient) { }
url2="http://172.19.113.4:3000/api/getUser"

  users(){
    return this.http.get(this.url2)
  }
  saveUser(data:any){
    return this.http.post(this.url,data)
  }
}
