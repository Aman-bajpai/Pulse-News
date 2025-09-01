import { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  onCategoryChange?: (category: string) => void;
  onSearch?: (query: string) => void;
}

export const Layout = ({ children, onCategoryChange, onSearch }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('general');

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setIsMenuOpen(false); // Close mobile menu after selection
    onCategoryChange?.(category);
  };

  const handleSearch = (query: string) => {
    onSearch?.(query);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onSearch={handleSearch}
        onMenuToggle={handleMenuToggle}
        isMenuOpen={isMenuOpen}
      />

      <div className="flex">
        <Sidebar
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          isOpen={isMenuOpen}
        />

        {/* Main Content */}
        <main className="flex-1 md:ml-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
};
