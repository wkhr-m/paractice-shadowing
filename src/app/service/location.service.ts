import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private readonly urlParser = document.createElement('a');
  private urlSubject = new ReplaySubject<string>(1);

  currentUrl = this.urlSubject.pipe(map((url) => this.stripSlashes(url)));

  currentPath = this.currentUrl.pipe(
    map((url) => (url.match(/[^?#]*/) || [])[0]) // strip query and hash
  );
  constructor(private location: Location) {
    this.urlSubject.next(location.path(true));
    this.location.subscribe((state) => this.urlSubject.next(state.url || ''));
  }

  go(url: string | null | undefined) {
    if (!url) {
      return;
    }
    this.location.go(url);
    this.urlSubject.next(url);
  }

  private stripSlashes(url: string) {
    return url.replace(/^\/+/, '').replace(/\/+(\?|#|$)/, '$1');
  }
}
