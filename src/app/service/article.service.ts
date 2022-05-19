import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { htmlFromStringKnownToSatisfyTypeContract } from 'safevalues/unsafe/reviewed';
import {
  ArticleContents,
  Content,
  CONTENT_TYPE_DOCUMENT,
  DocumentContents,
} from './article-contents';

const FETCHING_ERROR_CONTENTS = (path: string): TrustedHTML =>
  htmlFromStringKnownToSatisfyTypeContract(
    `
  <div >
    <h1>PAGE NOT FOUND</h1>
    <div>
    We're sorry. The page you are looking for cannot be found.
    </div>
  </div>
`,
    'inline HTML with interpolations escaped'
  );

const INDEX_CONTENTS = (): TrustedHTML =>
  htmlFromStringKnownToSatisfyTypeContract(
    `
  <div class="nf-container l-flex-wrap flex-center">
    Index
  </div>
`,
    'inline HTML with interpolations escaped'
  );

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  content: Observable<Content>;

  constructor(private http: HttpClient) {
    const path = window.location.pathname.replace('/', '');
    this.content = this.getDocument(path);
  }

  private getDocument(path: string) {
    if (!path || path === '/') {
      return this.getIndex();
    }
    return this.fetchArticle(`assets/${path}/content.json`);
  }

  private fetchArticle(url: string): Observable<Content> {
    return this.http.get<ArticleContents>(url).pipe(
      tap((data) => {
        if (!data || typeof data !== 'object') {
          throw Error('Invalid data');
        }
      }),
      catchError((error: any) => {
        console.log(error);
        return this.getErrorDoc(url);
      })
    );
  }

  private getIndex(): Observable<DocumentContents> {
    return of({
      id: 'index',
      title: 'Plactice Shadowing',
      type: CONTENT_TYPE_DOCUMENT,
      contents: INDEX_CONTENTS(),
    });
  }

  private getErrorDoc(id: string): Observable<DocumentContents> {
    return of({
      id: id,
      title: 'oops',
      type: CONTENT_TYPE_DOCUMENT,
      contents: FETCHING_ERROR_CONTENTS(id),
    });
  }
}
