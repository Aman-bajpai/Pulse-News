# Pulse - News Aggregator

A modern, responsive news aggregator built with React, TypeScript, and Tailwind CSS. Pulse provides a clean, intuitive interface for discovering and reading news from various sources around the world.

## Features

- 📰 **Real-time News**: Stay updated with the latest news from trusted sources
- 🔍 **Smart Search**: Find specific news articles with powerful search functionality
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Beautiful design with smooth animations and transitions
- 📊 **Category Filtering**: Browse news by categories like Technology, Business, Sports, etc.
- 🌙 **Dark/Light Mode Ready**: Extensible theme system
- ⚡ **Fast Performance**: Optimized with React best practices and modern tooling

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Icons**: Heroicons
- **Build Tool**: Vite
- **API**: NewsAPI (configurable)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pulse-news-aggregator
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your NewsAPI key:
```env
VITE_NEWS_API_KEY=your_news_api_key_here
```

Get your API key from [NewsAPI.org](https://newsapi.org/)

**Note**: The application will work with mock data if no API key is provided, but for real news data, you'll need to register for a free API key.

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation header
│   ├── Sidebar.tsx     # Category sidebar
│   ├── Layout.tsx      # Main layout wrapper
│   ├── NewsCard.tsx    # Individual news article card
│   ├── NewsGrid.tsx    # News articles grid
│   ├── ArticleModal.tsx # Full article modal
│   ├── Loading.tsx     # Loading animations
│   ├── Skeleton.tsx    # Skeleton loading states
│   └── ErrorBoundary.tsx # Error boundary component
├── hooks/              # Custom React hooks
│   └── useNews.ts      # News data management hook
├── services/           # API services
│   └── newsService.ts  # News API integration
├── types/              # TypeScript type definitions
│   └── news.ts         # News-related types
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Features in Detail

### News Categories
- General
- Business
- Technology
- Health
- Science
- Sports
- Entertainment

### Search Functionality
- Real-time search with debouncing
- Search across titles, descriptions, and content
- Category-specific search

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interactions

### Performance Optimizations
- Lazy loading of components
- Image optimization
- Efficient state management
- Error boundaries for stability

## Environment Variables

The application uses environment variables for configuration. Copy `.env.example` to `.env` and configure the following variables:

### Required Variables

- `VITE_NEWS_API_KEY`: Your NewsAPI key (get it from [NewsAPI.org](https://newsapi.org/))

### Optional Variables

- `VITE_DEFAULT_COUNTRY`: Default country for news (ISO 3166-1 alpha-2 code, e.g., `us`, `gb`, `ca`)
- `VITE_DEFAULT_LANGUAGE`: Default language for news (ISO 639-1 code, e.g., `en`, `es`, `fr`)

### Example .env file

```env
VITE_NEWS_API_KEY=your_news_api_key_here
VITE_DEFAULT_COUNTRY=us
VITE_DEFAULT_LANGUAGE=en
```

## API Configuration

The app uses NewsAPI as the data source. Without an API key, it falls back to mock data for development purposes.

### Getting a NewsAPI Key

1. Visit [NewsAPI.org](https://newsapi.org/)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Add it to your `.env` file

### API Rate Limits

- Free tier: 100 requests/day
- Developer tier: 50,000 requests/month
- Paid tiers available for higher limits

## Customization

### Theme Colors

The app uses a custom color system defined in `tailwind.config.js`:

```js
colors: {
  primary: {
    50: '#f0f9ff',
    // ... more shades
    900: '#0c4a6e',
  },
  secondary: {
    50: '#fefce8',
    // ... more shades
    900: '#713f12',
  }
}
```

### Fonts

The app uses Google Fonts:
- **Inter**: Primary font for body text
- **Poppins**: Display font for headings

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- News data provided by [NewsAPI](https://newsapi.org/)
- Icons by [Heroicons](https://heroicons.com/)
- Fonts by [Google Fonts](https://fonts.google.com/)

---

Built with ❤️ using React, TypeScript, and Tailwind CSS