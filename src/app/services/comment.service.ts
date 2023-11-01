import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://172.19.113.4:3000/api/comment/:contentIdentifier'; 

  constructor(private http: HttpClient) {}

  addComment(contentId: string, userId: string, commentText: string): Observable<any> {
    const comment = {
      contentId: contentId,
      userId: userId,
      text: commentText
    };

    const headers = new HttpHeaders({
      'Authorization': 'Bearer YourAccessToken',
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrl, comment, { headers });
  }
}
