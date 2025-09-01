import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { ClockIcon, UserIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import type { NewsArticle } from '../types/news';

interface NewsCardProps {
  article: NewsArticle;
  onClick?: (article: NewsArticle) => void;
  variant?: 'default' | 'featured' | 'compact';
}

export const NewsCard = React.memo(({ article, onClick, variant = 'default' }: NewsCardProps) => {
  const handleClick = () => {
    onClick?.(article);
  };

  const handleReadMore = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(article.url, '_blank');
  };

  const publishedDate = new Date(article.publishedAt);
  const timeAgo = formatDistanceToNow(publishedDate, { addSuffix: true });

  if (variant === 'featured') {
    return (
      <div
        className="news-card cursor-pointer group overflow-hidden"
        onClick={handleClick}
      >
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img
            src={article.urlToImage || '/api/placeholder/600/400'}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/api/placeholder/600/400';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center space-x-2 mb-2">
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium">
                {article.category || 'News'}
              </span>
              <span className="text-sm opacity-80">{article.source.name}</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold font-display mb-2 line-clamp-3 group-hover:text-primary-200 transition-colors">
              {article.title}
            </h3>
            <p className="text-sm opacity-90 line-clamp-2 mb-3">
              {article.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-xs opacity-80">
                <div className="flex items-center space-x-1">
                  <ClockIcon className="h-3 w-3" />
                  <span>{timeAgo}</span>
                </div>
                {article.author && (
                  <div className="flex items-center space-x-1">
                    <UserIcon className="h-3 w-3" />
                    <span>{article.author}</span>
                  </div>
                )}
              </div>
              <button
                onClick={handleReadMore}
                className="flex items-center space-x-1 text-xs font-medium hover:text-primary-300 transition-colors"
              >
                <span>Read More</span>
                <ArrowTopRightOnSquareIcon className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div
        className="news-card cursor-pointer group p-4"
        onClick={handleClick}
      >
        <div className="flex space-x-4">
          <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-lg">
            <img
              src={article.urlToImage || '/api/placeholder/80/80'}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/api/placeholder/80/80';
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full font-medium">
                {article.category || 'News'}
              </span>
              <span className="text-xs text-gray-500">{article.source.name}</span>
            </div>
            <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1 group-hover:text-primary-600 transition-colors">
              {article.title}
            </h4>
            <p className="text-xs text-gray-600 line-clamp-1 mb-2">
              {article.description}
            </p>
            <div className="flex items-center space-x-3 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <ClockIcon className="h-3 w-3" />
                <span>{timeAgo}</span>
              </div>
              <button
                onClick={handleReadMore}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div
      className="news-card cursor-pointer group overflow-hidden"
      onClick={handleClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={article.urlToImage || '/api/placeholder/400/200'}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/api/placeholder/400/200';
          }}
        />
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
            {article.category || 'News'}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-sm text-gray-500">{article.source.name}</span>
          <span className="text-gray-300">•</span>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <ClockIcon className="h-4 w-4" />
            <span>{timeAgo}</span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {article.title}
        </h3>

        <p className="text-gray-600 text-sm line-clamp-3 mb-4">
          {article.description}
        </p>

        <div className="flex items-center justify-between">
          {article.author && (
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <UserIcon className="h-4 w-4" />
              <span className="truncate max-w-32">{article.author}</span>
            </div>
          )}
          <button
            onClick={handleReadMore}
            className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium text-sm ml-auto"
          >
            <span>Read More</span>
            <ArrowTopRightOnSquareIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
});
