import type { TrustedHTML } from 'trusted-types/lib';

export interface ArticleContents {
  id: string;
  title: string;
  url?: string;
  fileName: string;
  pharases: ArticlePhrase[];
}

export interface ArticlePhrase {
  ja: string;
  en: string;
  time: ArticlePhraseTime;
}

export interface ArticlePhraseTime {
  start: number;
  end: number;
}

export interface DocumentContents {
  id: string;
  contents: TrustedHTML | null;
}
