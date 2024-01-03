import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  handleUnlike: any;
  getComments(contentId: string): { userId: string; comment: string; }[] {
    throw new Error('Method not implemented.');
  }
  constructor() {}

  handleLike(contentId: string, userId: string): void {
    const likesData = this.getLikesDataFromLocalStorage();
    if (likesData[contentId] && likesData[contentId].includes(userId)) {
      likesData[contentId] = likesData[contentId].filter((id) => id !== userId);
    } else {
      likesData[contentId] = [...(likesData[contentId] || []), userId];
    }
    this.saveLikesDataToLocalStorage(likesData);
  }

  getLikesCount(contentId: string): number {
    const likesData = this.getLikesDataFromLocalStorage();
    const likes = likesData[contentId] || [];
    return likes.length;
  }

  handleComment(contentId: string, userId: string, commentText: string): void {
    const commentsData = this.getCommentsDataFromLocalStorage();
    if (commentsData[contentId]) {
      commentsData[contentId].push({ userId, commentText });
    } else {
      commentsData[contentId] = [{ userId, commentText }];
    }
    this.saveCommentsDataToLocalStorage(commentsData);
  }

  getCommentsCount(contentId: string): number {
    const commentsData = this.getCommentsDataFromLocalStorage();
    const comments = commentsData[contentId] || [];
    return comments.length;
  }

  private getLikesDataFromLocalStorage(): { [contentId: string]: string[] } {
    const likesDataString = localStorage.getItem('likes') || '{}';
    return JSON.parse(likesDataString);
  }

  private saveLikesDataToLocalStorage(likesData: { [contentId: string]: string[] }): void {
    localStorage.setItem('likes', JSON.stringify(likesData));
  }

  private getCommentsDataFromLocalStorage(): { [contentId: string]: { userId: string; commentText: string }[] } {
    const commentsDataString = localStorage.getItem('comments') || '{}';
    return JSON.parse(commentsDataString);
  }

  private saveCommentsDataToLocalStorage(commentsData: { [contentId: string]: { userId: string; commentText: string }[] }): void {
    localStorage.setItem('comments', JSON.stringify(commentsData));
  }
}
