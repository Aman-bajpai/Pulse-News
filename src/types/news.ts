export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  category?: string;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}

export interface NewsApiError {
  status: string;
  code: string;
  message: string;
}

export type NewsCategory =
  | 'general'
  | 'business'
  | 'entertainment'
  | 'health'
  | 'science'
  | 'sports'
  | 'technology';

export interface NewsFilters {
  category?: NewsCategory;
  country?: string;
  language?: string;
  query?: string;
  pageSize?: number;
  page?: number;
}

export interface UseNewsState {
  articles: NewsArticle[];
  loading: boolean;
  error: string | null;
  totalResults: number;
  currentPage: number;
  hasMore: boolean;
}
