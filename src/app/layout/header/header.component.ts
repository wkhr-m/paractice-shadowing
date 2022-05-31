import { Component, Input, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';

@Component({
  template: `<header>
    <mat-toolbar>
      <mat-toolbar-row>
        <a href="/" mat-icon-button *ngIf="needBackButton">
          <fa-icon [icon]="faArrowLeftIcon"></fa-icon>
        </a>
        <span class="title">{{ title || 'Practice Shadowing' }}</span>
      </mat-toolbar-row>
    </mat-toolbar>
  </header>`,
  selector: 'app-header',
  styleUrls: ['./header.less'],
})
export class HeaderComponent implements OnInit {
  @Input() title?: string;
  @Input() needBackButton: boolean = false;
  faArrowLeftIcon = faArrowLeft;

  constructor() {}

  ngOnInit(): void {}
}
