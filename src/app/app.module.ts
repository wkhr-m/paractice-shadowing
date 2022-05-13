import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AppComponent } from './app.component';
import { ArticleViewerComponent } from './layout/article-viewer/article-viewer.component';
import { HeaderComponent } from './layout/header/header.component';
import { PlayerComponent } from './layout/player/player.component';
import { WordDialogComponent } from './layout/word-dialog/word-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ArticleViewerComponent,
    PlayerComponent,
    WordDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    HttpClientModule,
    FontAwesomeModule,
    NgxSkeletonLoaderModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
