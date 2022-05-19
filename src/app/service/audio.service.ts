import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  ctx: AudioContext = new AudioContext();

  constructor() {}

  async fetchAudio(path: string) {
    const response = await fetch(`assets/${path}/audio.mp3`);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await this.ctx.decodeAudioData(arrayBuffer);
    return audioBuffer;
  }
}
