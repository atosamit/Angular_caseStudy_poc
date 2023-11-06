import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl = 'https://contentmanagement-7iyh.onrender.com/api/comment';
  
  constructor(private http: HttpClient) {}

  addComment(userId: string, commentText: string, contentId: string): Observable<any> {
    const comment = {
      userId: userId,
      text: commentText
    };

    const headers = new HttpHeaders({
      'Authorization': 'Bearer YourAccessToken',
      'Content-Type': 'application/json'
    });

    const apiUrl = `${this.baseUrl}/${contentId}`;

    return this.http.post(apiUrl, comment, { headers });
  }
}


