import { useState } from 'react';
import { NewsCard } from './NewsCard';
import { FunnelIcon, ViewColumnsIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import type { NewsArticle } from '../types/news';

interface NewsGridProps {
  articles: NewsArticle[];
  loading?: boolean;
  onArticleClick?: (article: NewsArticle) => void;
}

type ViewMode = 'grid' | 'list' | 'compact';

export const NewsGrid = ({ articles, loading = false, onArticleClick }: NewsGridProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'relevance'>('newest');

  const sortedArticles = [...articles].sort((a, b) => {
    const dateA = new Date(a.publishedAt).getTime();
    const dateB = new Date(b.publishedAt).getTime();

    switch (sortBy) {
      case 'newest':
        return dateB - dateA;
      case 'oldest':
        return dateA - dateB;
      case 'relevance':
        // For now, sort by date as relevance would require more complex logic
        return dateB - dateA;
      default:
        return 0;
    }
  });

  const getGridClasses = () => {
    switch (viewMode) {
      case 'grid':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
      case 'list':
        return 'space-y-6';
      case 'compact':
        return 'space-y-4';
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    }
  };

  const getCardVariant = () => {
    switch (viewMode) {
      case 'grid':
        return 'default';
      case 'list':
        return 'featured';
      case 'compact':
        return 'compact';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <div className={getGridClasses()}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="news-card p-6 animate-pulse">
            <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FunnelIcon className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
        <p className="text-gray-600">Try adjusting your search terms or filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            {articles.length} article{articles.length !== 1 ? 's' : ''} found
          </span>
        </div>

        <div className="flex items-center space-x-4">
          {/* Sort By */}
          <div className="flex items-center space-x-2">
            <label htmlFor="sort" className="text-sm text-gray-600">Sort by:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="relevance">Relevance</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-1 border border-gray-300 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded ${
                viewMode === 'grid'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-100'
              } transition-colors`}
              title="Grid view"
            >
              <Squares2X2Icon className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded ${
                viewMode === 'list'
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-100'
              } transition-colors`}
              title="List view"
            >
              <ViewColumnsIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Articles Grid */}
      <div className={getGridClasses()}>
        {sortedArticles.map((article) => (
          <NewsCard
            key={article.id}
            article={article}
            variant={getCardVariant()}
            onClick={onArticleClick}
          />
        ))}
      </div>

      {/* Load More Button */}
      {articles.length > 0 && (
        <div className="text-center pt-8">
          <button className="btn-primary px-8 py-3">
            Load More Articles
          </button>
        </div>
      )}
    </div>
  );
};
