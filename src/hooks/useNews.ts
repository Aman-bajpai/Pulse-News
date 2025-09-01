import { useState, useEffect, useCallback } from 'react';
import type { NewsFilters, UseNewsState } from '../types/news';
import { newsService } from '../services/newsService';

export const useNews = (initialFilters: NewsFilters = {}) => {
  const [state, setState] = useState<UseNewsState>({
    articles: [],
    loading: false,
    error: null,
    totalResults: 0,
    currentPage: 1,
    hasMore: false
  });

  const [filters, setFilters] = useState<NewsFilters>(initialFilters);

  const fetchNews = useCallback(async (newFilters: NewsFilters = {}, append = false) => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const currentFilters = { ...filters, ...newFilters };
      const response = await newsService.getTopHeadlines({
        ...currentFilters,
        pageSize: currentFilters.pageSize || 12,
        page: currentFilters.page || 1
      });

      setState(prev => ({
        ...prev,
        loading: false,
        articles: append ? [...prev.articles, ...response.articles] : response.articles,
        totalResults: response.totalResults,
        currentPage: currentFilters.page || 1,
        hasMore: (currentFilters.page || 1) * (currentFilters.pageSize || 12) < response.totalResults,
        error: null
      }));

      setFilters(currentFilters);
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch news'
      }));
    }
  }, [filters]);

  const searchNews = useCallback(async (query: string, newFilters: NewsFilters = {}) => {
    if (!query.trim()) {
      fetchNews(newFilters);
      return;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const currentFilters = { ...filters, ...newFilters };
      const response = await newsService.searchArticles(query, {
        ...currentFilters,
        pageSize: currentFilters.pageSize || 12,
        page: currentFilters.page || 1
      });

      setState(prev => ({
        ...prev,
        loading: false,
        articles: response.articles,
        totalResults: response.totalResults,
        currentPage: currentFilters.page || 1,
        hasMore: (currentFilters.page || 1) * (currentFilters.pageSize || 12) < response.totalResults,
        error: null
      }));

      setFilters({ ...currentFilters, query });
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to search news'
      }));
    }
  }, [filters, fetchNews]);

  const loadMore = useCallback(() => {
    if (!state.loading && state.hasMore) {
      const nextPage = state.currentPage + 1;
      fetchNews({ ...filters, page: nextPage }, true);
    }
  }, [state.loading, state.hasMore, state.currentPage, filters, fetchNews]);

  const updateFilters = useCallback((newFilters: Partial<NewsFilters>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);

    if (updatedFilters.query) {
      searchNews(updatedFilters.query, updatedFilters);
    } else {
      fetchNews(updatedFilters);
    }
  }, [filters, fetchNews, searchNews]);

  const retry = useCallback(() => {
    if (filters.query) {
      searchNews(filters.query, filters);
    } else {
      fetchNews(filters);
    }
  }, [filters, fetchNews, searchNews]);

  // Initial load
  useEffect(() => {
    fetchNews(initialFilters);
  }, []); // Only run once on mount

  return {
    ...state,
    filters,
    fetchNews,
    searchNews,
    loadMore,
    updateFilters,
    retry
  };
};
