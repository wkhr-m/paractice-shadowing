import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons/faArrowRight';
import { faEarListen } from '@fortawesome/free-solid-svg-icons/faEarListen';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons/faMicrophone';
import { faPause } from '@fortawesome/free-solid-svg-icons/faPause';
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';
import { faRepeat } from '@fortawesome/free-solid-svg-icons/faRepeat';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.less'],
})
export class PlayerComponent implements OnInit {
  @Input() isPlaying: boolean = false;
  @Output() play: EventEmitter<undefined> = new EventEmitter();
  @Output() changeRate: EventEmitter<number> = new EventEmitter();
  currentRateIndex: number = 0;
  isRepeat: boolean = false;
  faPlayIcon = faPlay;
  faMicrophoneIcon = faMicrophone;
  faPauseIcon = faPause;
  faEarListenIcon = faEarListen;
  faRepeatIcon = faRepeat;
  faArrowRightIcon = faArrowRight;

  RATE = [1, 0.7, 0.5];

  constructor() {}

  ngOnInit(): void {}

  onPlay(): void {
    this.play.emit();
  }

  onChangeRate(): void {
    if (this.currentRateIndex === this.RATE.length - 1) {
      this.currentRateIndex = 0;
    } else {
      this.currentRateIndex = this.currentRateIndex + 1;
    }
    this.changeRate.emit(this.RATE[this.currentRateIndex]);
  }

  onChangeRepeat(): void {
    this.isRepeat = !this.isRepeat;
  }
}
