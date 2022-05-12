import { Component, Input, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';

@Component({
  template: `<header>
    <mat-toolbar>
      <mat-toolbar-row>
        <button mat-icon-button>
          <fa-icon [icon]="faArrowLeftIcon"></fa-icon>
        </button>
        <span>{{ title || 'Practice Shadowing' }}</span>
      </mat-toolbar-row>
    </mat-toolbar>
  </header>`,
  selector: 'app-header',
})
export class HeaderComponent implements OnInit {
  @Input() title?: string;
  faArrowLeftIcon = faArrowLeft;

  constructor() {}

  ngOnInit(): void {}
}
