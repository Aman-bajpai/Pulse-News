import { useState } from 'react';
import {
  NewspaperIcon,
  GlobeAltIcon,
  CpuChipIcon,
  CurrencyDollarIcon,
  HeartIcon,
  LightBulbIcon,
  BoltIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const categories: Category[] = [
  { id: 'general', name: 'General', icon: NewspaperIcon, color: 'text-blue-600' },
  { id: 'world', name: 'World', icon: GlobeAltIcon, color: 'text-green-600' },
  { id: 'technology', name: 'Technology', icon: CpuChipIcon, color: 'text-purple-600' },
  { id: 'business', name: 'Business', icon: CurrencyDollarIcon, color: 'text-yellow-600' },
  { id: 'health', name: 'Health', icon: HeartIcon, color: 'text-red-600' },
  { id: 'science', name: 'Science', icon: LightBulbIcon, color: 'text-indigo-600' },
  { id: 'sports', name: 'Sports', icon: BoltIcon, color: 'text-orange-600' },
  { id: 'entertainment', name: 'Entertainment', icon: UserGroupIcon, color: 'text-pink-600' },
];

interface SidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  isOpen: boolean;
}

export const Sidebar = ({ selectedCategory, onCategoryChange, isOpen }: SidebarProps) => {
  const [activeCategory, setActiveCategory] = useState(selectedCategory);

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    onCategoryChange(categoryId);
  };

  return (
    <aside className={`
      fixed md:relative top-16 md:top-0 left-0 z-40
      w-64 h-[calc(100vh-4rem)] md:h-full
      transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
      transition-transform duration-300 ease-in-out
      glass-effect border-r border-gray-200/50
      overflow-y-auto
    `}>
      <div className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6 font-display">Categories</h2>

        <div className="space-y-2">
          {categories.map((category) => {
            const IconComponent = category.icon;
            const isActive = activeCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left
                  transition-all duration-200 group
                  ${isActive
                    ? 'bg-primary-50 border border-primary-200 text-primary-700 shadow-sm'
                    : 'hover:bg-gray-50 text-gray-700 hover:text-gray-900'
                  }
                `}
              >
                <IconComponent
                  className={`h-5 w-5 ${isActive ? 'text-primary-600' : category.color} group-hover:scale-110 transition-transform duration-200`}
                />
                <span className={`font-medium ${isActive ? 'text-primary-700' : 'text-gray-700'}`}>
                  {category.name}
                </span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Trending Topics Section */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Trending Topics
          </h3>
          <div className="space-y-2">
            {['AI Revolution', 'Climate Change', 'Space Exploration', 'Global Economy'].map((topic, index) => (
              <div
                key={topic}
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer group"
              >
                <span className="text-sm text-gray-600 group-hover:text-gray-900">{topic}</span>
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full">
                  #{index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* News Sources Section */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Top Sources
          </h3>
          <div className="space-y-2">
            {['Reuters', 'BBC News', 'CNN', 'The Guardian'].map((source) => (
              <div
                key={source}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer group"
              >
                <div className="w-6 h-6 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {source.charAt(0)}
                  </span>
                </div>
                <span className="text-sm text-gray-600 group-hover:text-gray-900">{source}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
