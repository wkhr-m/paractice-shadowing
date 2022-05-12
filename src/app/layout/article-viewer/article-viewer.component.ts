import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import type {
  ArticlePhrase,
  ArticlePhraseTime,
} from './../../service/article-contents';

@Component({
  selector: 'app-article-viewer',
  templateUrl: './article-viewer.component.html',
  styleUrls: ['./article-viewer.component.less'],
})
export class ArticleViewerComponent implements OnInit {
  @Input() article?: ArticlePhrase[];
  @Output() playPharase: EventEmitter<ArticlePhraseTime> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onPlayPharase(time: ArticlePhraseTime) {
    this.playPharase.emit(time);
  }
}
