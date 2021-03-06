import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { htmlFromStringKnownToSatisfyTypeContract } from 'safevalues/unsafe/reviewed';
import {
  ArticleContents,
  Content,
  CONTENT_TYPE_DOCUMENT,
  DocumentContents,
} from './article-contents';
import { LocationService } from './location.service';

const FETCHING_ERROR_CONTENTS = (): TrustedHTML =>
  htmlFromStringKnownToSatisfyTypeContract(
    `
  <div class="api-body">
    <h1>PAGE NOT FOUND</h1>
    <div>
    We're sorry. The page you are looking for cannot be found.
    </div>
  </div>
`,
    'inline HTML with interpolations escaped'
  );

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  content: Observable<Content>;

  constructor(private http: HttpClient, locationService: LocationService) {
    this.content = locationService.currentPath.pipe(
      switchMap((path) => this.getDocument(path))
    );
  }

  private getDocument(path: string) {
    if (!path || path === '/') {
      return this.fetchIndex();
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
        return this.getErrorDoc(url);
      })
    );
  }

  private fetchIndex(): Observable<Content> {
    return this.http.get<DocumentContents>(`assets/index.json`);
  }

  private getErrorDoc(id: string): Observable<DocumentContents> {
    return of({
      id: id,
      title: 'oops',
      type: CONTENT_TYPE_DOCUMENT,
      contents: FETCHING_ERROR_CONTENTS(),
    });
  }
}
