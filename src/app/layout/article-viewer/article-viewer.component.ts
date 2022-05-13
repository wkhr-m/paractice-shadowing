import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import type {
  ArticlePhrase,
  ArticlePhraseTime,
} from './../../service/article-contents';
import { WordDialogComponent } from './../word-dialog/word-dialog.component';

@Component({
  selector: 'app-article-viewer',
  templateUrl: './article-viewer.component.html',
  styleUrls: ['./article-viewer.component.less'],
})
export class ArticleViewerComponent implements OnChanges {
  @Input() article?: ArticlePhrase[];
  @Output() playPharase: EventEmitter<ArticlePhraseTime> = new EventEmitter();
  @Output() stopPharase: EventEmitter<ArticlePhraseTime> = new EventEmitter();
  englishPharases: string[][] = [];

  constructor(public dialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['article'].currentValue) {
      this.englishPharases = changes['article'].currentValue.map(
        (pharase: ArticlePhrase) => pharase.en.split(' ')
      );
    }
  }

  onOpenWordDialog(word: string, event: Event) {
    this.stopPharase.emit();
    this.dialog.open(WordDialogComponent, {
      id: 'dialog',
      maxWidth: '80%',
      data: { word },
      disableClose: true,
      hasBackdrop: true,
    });
  }

  onPlayPharase(time: ArticlePhraseTime) {
    this.playPharase.emit(time);
  }
}
