# E-Shop - React + TypeScript E-Commerce Application

![CI](https://github.com/bsozer06/e-shop-app/workflows/CI/badge.svg)
![Coverage](https://github.com/bsozer06/e-shop-app/workflows/Coverage/badge.svg)

🚀 **Deploy to Vercel:** See [VERCEL-DEPLOYMENT.md](VERCEL-DEPLOYMENT.md) for setup guide

A modern e-commerce application built with React, TypeScript, and Tailwind CSS, following best practices and atomic design principles.

## Features

- 🛍️ Product listing with category filtering
- 🔍 Search functionality
- 🛒 Shopping cart with quantity management
- 🔐 Authentication (login/logout)
- 📱 Responsive design
- ⚡ Fast and optimized with Vite
- 🎨 Styled with Tailwind CSS
- 🔔 Toast notifications
- 📦 Code splitting for optimal performance

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Routing
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **React Hot Toast** - Notifications
- **FakeStore API** - Backend API

## Project Structure

```
src/
├── api/              # API service functions
├── components/
│   ├── atoms/        # Basic UI components (Button, Input)
│   ├── molecules/    # Composite components (ProductCard, SearchBar)
│   └── organisms/    # Complex components (Header, ProductList)
├── context/          # React Context providers
├── hooks/            # Custom React hooks
├── pages/            # Page components
└── types/            # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Test Credentials

Use these credentials to test the login functionality:
- **Username:** mor_2314
- **Password:** 83r5^_

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:ui` - Run tests with Vitest UI
- `npm run test:coverage` - Generate test coverage report

## Features in Detail

### Authentication
- Login with FakeStore API
- Token-based authentication
- Protected routes
- Persistent login state

### Shopping Cart
- Add/remove products
- Update quantities
- Local storage persistence
- Real-time total calculation

### Product Catalog
- View all products
- Filter by category
- Search by name/description
- Detailed product view

## Best Practices Implemented

- ✅ Atomic Design Pattern
- ✅ Custom Hooks for reusable logic
- ✅ Context API for state management
- ✅ TypeScript for type safety
- ✅ Code splitting with React.lazy
- ✅ Error handling
- ✅ Loading states
- ✅ Responsive design
- ✅ Comprehensive unit tests (100% coverage for tested modules)
- ✅ Test-driven development ready

## Testing

This project includes comprehensive unit tests using Vitest, React Testing Library, and MSW.

**Current Test Coverage:**
- ✅ `API Layer` - 22 tests (MSW mocking)
- ✅ `useFetch` hook - 7 tests
- ✅ `CartContext` - 18 tests
- 📊 **100% statement coverage, 93.75% branch coverage**

See [TESTING.md](TESTING.md) for detailed testing documentation.

```bash
# Run all tests
npm test

# Watch mode for development
npm run test:watch

# Coverage report
npm run test:coverage
```

## API

This project uses the [FakeStore API](https://fakestoreapi.com/) for product and authentication data.

## CI/CD

This project includes a complete CI/CD pipeline using GitHub Actions:

- ✅ Automated testing on every push and PR
- ✅ Code linting and quality checks
- ✅ Test coverage reporting
- ✅ Security vulnerability scanning
- ✅ Automated deployment to production
- ✅ Weekly dependency updates

See [CI-CD.md](CI-CD.md) for detailed documentation.

## Deployment

This application is ready to deploy on **Vercel** with zero configuration!

### Quick Deploy to Vercel

1. Sign up at [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Click **Deploy**
4. Done! ✨

See detailed guide: [VERCEL-DEPLOYMENT.md](VERCEL-DEPLOYMENT.md)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT
```
