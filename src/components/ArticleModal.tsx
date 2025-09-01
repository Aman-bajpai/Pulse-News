import { format } from 'date-fns';
import { XMarkIcon, ArrowTopRightOnSquareIcon, ClockIcon, UserIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import type { NewsArticle } from '../types/news';

interface ArticleModalProps {
  article: NewsArticle | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ArticleModal = ({ article, isOpen, onClose }: ArticleModalProps) => {
  if (!isOpen || !article) return null;

  const publishedDate = new Date(article.publishedAt);
  const formattedDate = format(publishedDate, 'MMMM d, yyyy');
  const formattedTime = format(publishedDate, 'h:mm a');

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleReadFullArticle = () => {
    window.open(article.url, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fade-in"
      onClick={handleOverlayClick}
    >
      <div className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-slide-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
        >
          <XMarkIcon className="h-6 w-6 text-gray-600" />
        </button>

        {/* Hero Image */}
        {article.urlToImage && (
          <div className="relative h-64 md:h-80 overflow-hidden">
            <img
              src={article.urlToImage}
              alt={article.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="p-8 md:p-12">
          {/* Category Badge */}
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
              {article.category || 'News'}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 mb-8 text-gray-600">
            <div className="flex items-center space-x-2">
              <GlobeAltIcon className="h-5 w-5" />
              <span className="font-medium">{article.source.name}</span>
            </div>

            <div className="flex items-center space-x-2">
              <ClockIcon className="h-5 w-5" />
              <span>{formattedDate} at {formattedTime}</span>
            </div>

            {article.author && (
              <div className="flex items-center space-x-2">
                <UserIcon className="h-5 w-5" />
                <span>{article.author}</span>
              </div>
            )}
          </div>

          {/* Description */}
          {article.description && article.description !== article.title && (
            <div className="mb-8">
              <p className="text-xl text-gray-700 leading-relaxed font-medium">
                {article.description}
              </p>
            </div>
          )}

          {/* Content */}
          {article.content && (
            <div className="prose prose-lg max-w-none mb-8">
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {article.content.replace(/\[\+\d+\s+chars\]$/, '')}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200">
            <button
              onClick={handleReadFullArticle}
              className="btn-primary flex items-center justify-center space-x-2 px-8 py-3 text-lg"
            >
              <span>Read Full Article</span>
              <ArrowTopRightOnSquareIcon className="h-5 w-5" />
            </button>

            <button
              onClick={onClose}
              className="btn-secondary px-8 py-3 text-lg"
            >
              Close
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500 text-center">
              Article from {article.source.name} • Published {formattedDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
