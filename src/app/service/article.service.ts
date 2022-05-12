import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleContents } from './article-contents';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  articleContents: Observable<ArticleContents>;

  constructor(private http: HttpClient) {
    this.articleContents = this.getDocument('the-best-gift-i-ever-survived');
  }

  private getDocument(url: string) {
    const id = url || 'index';
    // this.fetchAudio('the-best-gift-i-ever-surviced.mp3');
    return this.fetchArticle(`assets/${id}.json`);
  }

  private fetchArticle(url: string): Observable<ArticleContents> {
    return this.http.get<ArticleContents>(url);
  }
}
