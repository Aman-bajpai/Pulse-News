import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from './components/Layout';
import { NewsGrid } from './components/NewsGrid';
import { ArticleModal } from './components/ArticleModal';
import { Loading } from './components/Loading';
import ErrorBoundary from './components/ErrorBoundary';
import { useNews } from './hooks/useNews';
import type { NewsArticle } from './types/news';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import './App.css';

function App() {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    articles,
    loading,
    error,
    totalResults,
    loadMore,
    hasMore,
    searchNews,
    updateFilters,
    retry
  } = useNews();

  const handleArticleClick = (article: NewsArticle) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      searchNews(query);
    } else {
      // If search is empty, fetch general news
      updateFilters({ query: undefined });
    }
  };

  const handleCategoryChange = (category: string) => {
    updateFilters({ category: category as any });
  };

  const handleLoadMore = () => {
    loadMore();
  };

  return (
    <ErrorBoundary>
      <Layout onCategoryChange={handleCategoryChange} onSearch={handleSearch}>
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Welcome Section */}
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold font-display text-gray-900 mb-4">
              Stay Informed with{' '}
              <motion.span
                className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                style={{ backgroundSize: '200% 200%' }}
              >
                Pulse
              </motion.span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the latest news from around the world, curated for you with real-time updates
              and personalized content.
            </p>
          </motion.div>

        {/* Error State */}
        {error && (
          <div className="glass-effect p-6 rounded-xl border border-red-200">
            <div className="flex items-center space-x-3">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-red-900 mb-1">Error Loading News</h3>
                <p className="text-red-700 mb-4">{error}</p>
                <button
                  onClick={retry}
                  className="btn-primary"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* News Grid */}
        <NewsGrid
          articles={articles}
          loading={loading && articles.length === 0}
          onArticleClick={handleArticleClick}
        />

        {/* Load More Button */}
        {hasMore && !loading && (
          <div className="text-center pt-8">
            <button
              onClick={handleLoadMore}
              className="btn-primary px-8 py-3"
            >
              Load More Articles
            </button>
          </div>
        )}

        {/* Loading State for Load More */}
        {loading && articles.length > 0 && (
          <motion.div
            className="text-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Loading variant="dots" text="Loading more articles..." />
          </motion.div>
        )}

        {/* Stats Section */}
        {!loading && articles.length > 0 && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              className="glass-effect p-6 text-center rounded-xl hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl font-bold text-primary-600 mb-2">{totalResults}+</div>
              <div className="text-gray-600">Articles Available</div>
            </motion.div>
            <motion.div
              className="glass-effect p-6 text-center rounded-xl hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl font-bold text-secondary-600 mb-2">{articles.length}</div>
              <div className="text-gray-600">Articles Loaded</div>
            </motion.div>
            <motion.div
              className="glass-effect p-6 text-center rounded-xl hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600">Live Updates</div>
            </motion.div>
            <motion.div
              className="glass-effect p-6 text-center rounded-xl hover:shadow-lg transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {Math.floor(Math.random() * 100) + 50}K+
              </div>
              <div className="text-gray-600">Daily Readers</div>
            </motion.div>
          </motion.div>
        )}

        {/* Empty State */}
        {!loading && articles.length === 0 && !error && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ExclamationTriangleIcon className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Articles Found</h3>
            <p className="text-gray-600">Try adjusting your search or category filters.</p>
          </div>
        )}
        </motion.div>

        {/* Article Modal */}
        <ArticleModal
          article={selectedArticle}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </Layout>
    </ErrorBoundary>
  );
}

export default App;
