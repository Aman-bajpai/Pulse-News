import type { NewsArticle, NewsApiResponse, NewsFilters } from '../types/news';

// GNews configuration
const GNEWS_API_KEY = import.meta.env.VITE_GNEWS_API_KEY || '';
const GNEWS_API_BASE_URL = 'https://gnews.io/api/v4';

// Mock data for development/fallback
const mockArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'Breaking: Major Technological Breakthrough Announced',
    description: 'Scientists have made a groundbreaking discovery that could revolutionize the field of artificial intelligence and machine learning.',
    content: 'In a stunning announcement today, researchers at leading universities have unveiled a new approach to artificial intelligence that promises to accelerate progress in the field by orders of magnitude...',
    url: 'https://example.com/tech-breakthrough',
    urlToImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400',
    publishedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    source: { id: 'tech-news', name: 'Tech News Daily' },
    author: 'Sarah Johnson',
    category: 'technology'
  },
  {
    id: '2',
    title: 'Global Markets Show Strong Recovery Signs',
    description: 'Stock markets worldwide are experiencing significant gains as economic indicators point to a robust recovery.',
    content: 'Financial analysts are optimistic about the current market trends, with major indices showing consistent upward movement over the past quarter...',
    url: 'https://example.com/markets-recovery',
    urlToImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    source: { id: 'financial-times', name: 'Financial Times' },
    author: 'Michael Chen',
    category: 'business'
  },
  {
    id: '3',
    title: 'New Study Reveals Surprising Health Benefits',
    description: 'Recent research shows that regular exercise combined with proper nutrition can significantly improve mental health.',
    content: 'A comprehensive study involving thousands of participants has revealed compelling evidence linking physical activity with improved cognitive function...',
    url: 'https://example.com/health-study',
    urlToImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    source: { id: 'health-journal', name: 'Health Journal' },
    author: 'Dr. Emily Rodriguez',
    category: 'health'
  },
  {
    id: '4',
    title: 'Space Exploration Mission Successfully Launched',
    description: 'NASA\'s latest mission to explore deep space has been successfully launched, marking a new era in space exploration.',
    content: 'The spacecraft, carrying advanced scientific instruments, is now on its journey to study distant planets and gather crucial data about our universe...',
    url: 'https://example.com/space-mission',
    urlToImage: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    source: { id: 'space-news', name: 'Space News' },
    author: 'Dr. James Wilson',
    category: 'science'
  },
  {
    id: '5',
    title: 'Championship Game Ends in Dramatic Fashion',
    description: 'The final match of the season delivered an unforgettable conclusion with last-minute heroics.',
    content: 'Sports fans around the world witnessed an incredible display of athletic prowess as the underdog team staged a remarkable comeback...',
    url: 'https://example.com/championship-game',
    urlToImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    source: { id: 'sports-central', name: 'Sports Central' },
    author: 'Tom Anderson',
    category: 'sports'
  },
  {
    id: '6',
    title: 'Award-Winning Film Premieres to Critical Acclaim',
    description: 'The latest blockbuster has received universal praise from critics and audiences alike.',
    content: 'Film critics are calling it a masterpiece, with the director\'s unique vision and the cast\'s outstanding performances creating a cinematic experience...',
    url: 'https://example.com/film-premiere',
    urlToImage: 'https://images.unsplash.com/photo-1489599795568-5fe0b6c49c63?w=400',
    publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    source: { id: 'entertainment-weekly', name: 'Entertainment Weekly' },
    author: 'Lisa Park',
    category: 'entertainment'
  }
];

class NewsService {
  private async fetchFromAPI(endpoint: string, params: Record<string, string>): Promise<NewsApiResponse> {
    const url = new URL(`${GNEWS_API_BASE_URL}${endpoint}`);

    // Add API key (GNews uses `token`)
    params.token = GNEWS_API_KEY;

    // Add query parameters
    Object.entries(params).forEach(([key, value]) => {
      if (value != null && value !== '') {
        url.searchParams.append(key, value);
      }
    });

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`GNews request failed: ${response.statusText}`);
    }

    const data = await response.json();

    // GNews returns shape: { totalArticles: number, articles: Array<...> }
    // Map to our internal NewsApiResponse shape
    const mapped: NewsApiResponse = {
      status: 'ok',
      totalResults: data.totalArticles ?? 0,
      articles: (data.articles ?? []).map((a: any): NewsArticle => ({
        id: a.url || this.nextId(),
        title: a.title || '',
        description: a.description || '',
        content: a.content || '',
        url: a.url || '',
        urlToImage: a.image || '',
        publishedAt: a.publishedAt || new Date().toISOString(),
        source: { id: null, name: a.source?.name || 'Unknown' },
        author: a.source?.name || null,
        category: undefined,
      })),
    };

    return mapped;
  }

  // Simple id fallback if url is missing
  // Not cryptographically secure (only for UI keys)
  private cryptoSeed = 0;
  private nextId(): string {
    this.cryptoSeed = (this.cryptoSeed + 1) % 1_000_000_000;
    return `gnews_${Date.now()}_${this.cryptoSeed}`;
  }

  private getMockArticles(filters: NewsFilters): NewsArticle[] {
    let filteredArticles = [...mockArticles];

    // Filter by category
    if (filters.category && filters.category !== 'general') {
      filteredArticles = filteredArticles.filter(
        article => article.category === filters.category
      );
    }

    // Filter by search query
    if (filters.query) {
      const query = filters.query.toLowerCase();
      filteredArticles = filteredArticles.filter(
        article =>
          article.title.toLowerCase().includes(query) ||
          article.description.toLowerCase().includes(query) ||
          article.content.toLowerCase().includes(query)
      );
    }

    // Apply pagination
    const pageSize = filters.pageSize || 12;
    const page = filters.page || 1;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return filteredArticles.slice(startIndex, endIndex);
  }

  async getTopHeadlines(filters: NewsFilters = {}): Promise<NewsApiResponse> {
    try {
      // If we have a real API key, use the actual API
      if (GNEWS_API_KEY) {
        const params: Record<string, string> = {};

        // GNews supports country and category via /top-headlines
        params.country = (filters.country || import.meta.env.VITE_DEFAULT_COUNTRY || 'us').toLowerCase();

        if (filters.category && filters.category !== 'general') {
          params.category = filters.category;
        }

        if (filters.pageSize) {
          params.max = filters.pageSize.toString();
        }

        if (filters.page) {
          params.page = filters.page.toString();
        }

        return await this.fetchFromAPI('/top-headlines', params);
      }

      // Otherwise, use mock data
      const articles = this.getMockArticles(filters);

      return {
        status: 'ok',
        totalResults: articles.length,
        articles
      };
    } catch (error) {
      console.error('Error fetching top headlines:', error);

      // Fallback to mock data on error
      const articles = this.getMockArticles(filters);

      return {
        status: 'ok',
        totalResults: articles.length,
        articles
      };
    }
  }

  async searchArticles(query: string, filters: NewsFilters = {}): Promise<NewsApiResponse> {
    try {
      // If we have a real API key, use the actual API
      if (GNEWS_API_KEY) {
        const params: Record<string, string> = {
          q: query,
        };

        if (filters.language) {
          params.lang = filters.language;
        }

        if (filters.pageSize) {
          params.max = filters.pageSize.toString();
        }

        if (filters.page) {
          params.page = filters.page.toString();
        }

        return await this.fetchFromAPI('/search', params);
      }

      // Otherwise, use mock data
      const searchFilters = { ...filters, query };
      const articles = this.getMockArticles(searchFilters);

      return {
        status: 'ok',
        totalResults: articles.length,
        articles
      };
    } catch (error) {
      console.error('Error searching articles:', error);

      // Fallback to mock data on error
      const searchFilters = { ...filters, query };
      const articles = this.getMockArticles(searchFilters);

      return {
        status: 'ok',
        totalResults: articles.length,
        articles
      };
    }
  }
}

export const newsService = new NewsService();
