import type { TrustedHTML } from 'trusted-types/lib';

export const CONTENT_TYPE_ARTICLE = 'article';
export const CONTENT_TYPE_DOCUMENT = 'document';

export type Content = ArticleContents | DocumentContents;

export interface ArticleContents {
  type: typeof CONTENT_TYPE_ARTICLE;
  id: string;
  title: string;
  url?: string;
  pharases: ArticlePhrase[];
}

export interface ArticlePhrase {
  ja: string;
  en: string;
  pronaunce?: string;
  time: ArticlePhraseTime;
}

export interface ArticlePhraseTime {
  start: number;
  end: number;
}

export interface DocumentContents {
  type: typeof CONTENT_TYPE_DOCUMENT;
  id: string;
  title: string;
  contents: TrustedHTML | null;
}

export const isArticle = (data: Content): data is ArticleContents => {
  return data.type === CONTENT_TYPE_ARTICLE;
};
