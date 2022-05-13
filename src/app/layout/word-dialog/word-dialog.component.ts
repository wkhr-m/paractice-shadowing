import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faVolumeHigh } from '@fortawesome/free-solid-svg-icons/faVolumeHigh';
import { faXmark } from '@fortawesome/free-solid-svg-icons/faXmark';
import { Word, WordService } from 'src/app/service/word.service';

export interface DialogData {
  word: string;
}
@Component({
  selector: 'app-word-dialog',
  templateUrl: './word-dialog.component.html',
  styleUrls: ['./word-dialog.component.less'],
})
export class WordDialogComponent {
  faXmarkIcon = faXmark;
  faVolumeHighIcon = faVolumeHigh;
  word = '';
  information?: Word;
  isLoaded: boolean = false;
  isError: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<WordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private wordSevice: WordService
  ) {
    this.word = data.word.replace(/[^a-zA-Z]/g, '');
    this.wordSevice.getWordInformation(this.word).subscribe(
      (res) => {
        this.information = res;
        this.isLoaded = true;
      },
      (error: any) => {
        console.warn(error);
        this.isError = true;
      }
    );
    dialogRef.disableClose = false;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onPlayWord(): void {
    const uttr = new SpeechSynthesisUtterance(this.data.word);
    uttr.lang = 'en-US';
    speechSynthesis.speak(uttr);
  }
}
