import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserDataService {
// url="http://172.19.113.4:3000/api/register";
url="https://contentmanagement-7iyh.onrender.com/api/register"
  constructor(private http:HttpClient) { }
// url2="http://172.19.113.4:3000/api/getUser"
url2="https://contentmanagement-7iyh.onrender.com/api/getUser"

  users(){
    return this.http.get(this.url2)
  }
  saveUser(data:any){
    return this.http.post(this.url,data)
  }
}
