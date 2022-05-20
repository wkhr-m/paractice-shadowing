import { Component } from '@angular/core';
import * as Tone from 'tone';
import type {
  ArticleContents,
  ArticlePhraseTime,
  Content,
  DocumentContents,
} from './service/article-contents';
import { isArticle } from './service/article-contents';
import { ArticleService } from './service/article.service';
import { AudioService } from './service/audio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  currentDocument?: DocumentContents;
  currentArticle?: ArticleContents;
  title: string = '';
  isPlaying: boolean = false;
  rate: number = 1;
  private player?: Tone.Player;
  private buffer?: AudioBuffer;

  constructor(
    private articleService: ArticleService,
    private audioService: AudioService
  ) {}

  ngOnInit(): void {
    this.articleService.content.subscribe(async (content: Content) => {
      console.log(content);
      this.title = content.title;
      if (isArticle(content)) {
        this.currentArticle = content;
        this.buffer = await this.audioService.fetchAudio(content.id);
      } else {
        this.currentArticle = undefined;
        this.currentDocument = content;
        this.buffer = undefined;
      }
    });
  }

  onStopPharase() {
    this.isPlaying = false;
    this.player?.stop();
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
      this.onStopPharase();
    }
    this.isPlaying = true;
    if (this.buffer) {
      const player = new Tone.Player(this.buffer).toDestination();

      if (this.rate !== 1) {
        this.changePlayerRate(this.rate, player);
      }

      if (time) {
        player.start(0, time.start / 1000, (time.end - time.start) / 1000);
        setTimeout(() => (this.isPlaying = false), time.end - time.start);
      } else {
        player.start(0);
      }
      this.player = player;
    }
  }

  private changePlayerRate(rate: number, player: Tone.Player) {
    player.playbackRate = rate;
    const pitch_shift = new Tone.PitchShift({
      pitch: rate === 1 ? 0 : rate === 0.5 ? 12 : 6,
    }).toDestination();
    player?.disconnect();
    player?.connect(pitch_shift);
  }

  onChangeRate(rate: number) {
    this.rate = rate;
    if (this.player) {
      this.changePlayerRate(rate, this.player);
    }
  }
}
