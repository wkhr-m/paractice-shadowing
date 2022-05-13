import { Component } from '@angular/core';
import type {
  ArticleContents,
  ArticlePhraseTime,
} from './service/article-contents';
import { ArticleService } from './service/article.service';
import { AudioService } from './service/audio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  currentArticle?: ArticleContents;
  isPlaying: boolean = false;
  rate: number = 1;
  private audioNode?: AudioBufferSourceNode;
  private buffer?: AudioBuffer;

  constructor(
    private articleService: ArticleService,
    private audioService: AudioService
  ) {}

  ngOnInit(): void {
    this.articleService.articleContents.subscribe(async (article) => {
      this.currentArticle = article;
      this.buffer = await this.audioService.fetchAudio(
        this.currentArticle?.fileName
      );
    });
  }

  onStopPharase() {
    this.audioNode?.stop();
    this.isPlaying = false;
  }

  onPlayOrStop() {
    if (this.isPlaying) {
      this.onStopPharase();
      return;
    }
    this.audioStart();
  }

  onPlayPharase(time: ArticlePhraseTime) {
    this.audioStart(time);
  }

  // 特定の期間を再生したい場合は引数にその時間を入れる
  private audioStart(time?: ArticlePhraseTime) {
    // 現在再生中だったら止める
    if (this.isPlaying) {
      this.audioNode?.stop();
    }
    this.isPlaying = true;
    if (this.buffer) {
      const source = this.audioService.ctx.createBufferSource();
      source.buffer = this.buffer;
      source.detune.value = -100;
      source.connect(this.audioService.ctx.destination);
      this.audioNode = source;

      if (time) {
        source.start(0, time.start / 1000, (time.end - time.start) / 1000);
        setTimeout(() => (this.isPlaying = false), time.end - time.start);
      } else {
        source.start(0);
      }
    }
  }

  onChangeRate(rate: number) {
    this.rate = rate;
  }
}
