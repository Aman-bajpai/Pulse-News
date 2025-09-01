import { useState } from 'react';
import { MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  onSearch: (query: string) => void;
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export const Header = ({ onSearch, onMenuToggle, isMenuOpen }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuToggle}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6 text-gray-600" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-gray-600" />
              )}
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <h1 className="text-xl font-bold font-display text-gray-900">Pulse</h1>
            </div>
          </div>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Categories
            </a>
            <a href="#" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              Trending
            </a>
            <a href="#" className="text-gray-700 hover:text-primary-600 font-medium transition-colors">
              About
            </a>
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4 md:mx-8">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search news..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>
          </div>

          {/* Theme Toggle Placeholder */}
          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-5 h-5 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full"></div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
