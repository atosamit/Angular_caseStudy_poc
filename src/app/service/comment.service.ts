import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';


interface Comment {
  userId: string;
  comment: string;
  contentId:string;
  createdAt: string;
  
}

interface body{

}


@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl = 'https://contentmanagement-7iyh.onrender.com/api/comment';
  //private BaseUrl = 'https://contentmanagement-7iyh.onrender.com/api/comments';
  constructor(private http: HttpClient) {}

  addComment(userId: string, commentText: string, contentId: string): Observable<any> {
    const comment = {
      contentId:contentId,
      userId: userId,
      text: commentText,
      
    };

    const apiUrl = `${this.baseUrl}/${contentId}`;

    return this.http.post(apiUrl, comment);
  }

  getComments(contentId: string): Observable<Comment[]> {
    const apiUrl = `https://contentmanagement-7iyh.onrender.com/api/comments/${contentId}`;

    // Make a GET request to fetch comments based on the contentId
    return this.http.get<Comment[]>(apiUrl);
  }
  
  addLike(userId: string, contentId: string): Observable<any> {
    const likeData = { userId, contentId };
    const url = `https://contentmanagement-7iyh.onrender.com/api/like/${contentId}`;
    return this.http.post<any>(url, likeData);
  }
  
  getCommentsWithDates(itemId: string): Observable<Comment[]> {
    const url = `https://contentmanagement-7iyh.onrender.com/api/comments/${itemId}`;

    return this.http.get<Comment[]>(url);
  }


  deleteComment(commentId: string, contentId: string): Observable<any> {
    const url = `https://contentmanagement-7iyh.onrender.com/api/Rcomment/${commentId}/${contentId}`;

    return this.http.delete(url);
  }
  
 
}


