# Contributing to E-Shop

Thank you for your interest in contributing! This document provides guidelines and steps for contributing.

## Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help others learn and grow

## Development Process

### 1. Fork and Clone

```bash
# Fork the repository on GitHub
git clone https://github.com/YOUR_USERNAME/e-shop-app.git
cd e-shop-app
```

### 2. Create a Branch

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Or a bugfix branch
git checkout -b fix/issue-description
```

### 3. Set Up Development Environment

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

### 4. Make Your Changes

- Write clean, readable code
- Follow existing code style
- Add tests for new features
- Update documentation as needed

### 5. Test Your Changes

```bash
# Run all tests
npm test

# Run linter
npm run lint

# Check test coverage
npm run test:coverage

# Build to verify no errors
npm run build
```

### 6. Commit Your Changes

Follow conventional commit format:

```bash
# Feature
git commit -m "feat: add product comparison feature"

# Bug fix
git commit -m "fix: resolve cart total calculation issue"

# Documentation
git commit -m "docs: update README with new examples"

# Test
git commit -m "test: add tests for ProductCard component"

# Refactor
git commit -m "refactor: optimize cart state management"

# Style
git commit -m "style: fix formatting in Header component"
```

### 7. Push and Create PR

```bash
# Push your branch
git push origin feature/your-feature-name

# Create Pull Request on GitHub
```

## Pull Request Guidelines

### PR Title Format
Use conventional commit format:
- `feat: description` for new features
- `fix: description` for bug fixes
- `docs: description` for documentation
- `test: description` for tests
- `refactor: description` for refactoring

### PR Description Should Include
1. **What** - What does this PR do?
2. **Why** - Why is this change needed?
3. **How** - How does it work?
4. **Testing** - How was it tested?
5. **Screenshots** - For UI changes

### Example PR Description
```markdown
## Description
Adds product comparison feature allowing users to compare up to 3 products side by side.

## Motivation
Users requested ability to compare product specifications before making a purchase decision.

## Changes
- Added ComparisonContext for managing compared products
- Created CompareBar component for UI
- Added comparison page with side-by-side layout
- Implemented 3-product limit with warning toast

## Testing
- [ ] Added unit tests for ComparisonContext
- [ ] Tested UI with different screen sizes
- [ ] Verified 3-product limit works correctly
- [ ] Tested with empty state

## Screenshots
[Add screenshots here]
```

## Coding Standards

### TypeScript
- Define types/interfaces for all props, state, and API responses
- Use strict mode
- Avoid `any` type
- Use type inference where appropriate

### React
- Use functional components only
- Use hooks for state and side effects
- Keep components small and focused
- Extract reusable logic into custom hooks

### Testing
- Write tests for new features
- Maintain test coverage above 80%
- Test both happy path and error cases
- Use descriptive test names

### File Structure
```
src/
├── api/              # API services
├── components/
│   ├── atoms/        # Basic components
│   ├── molecules/    # Composite components
│   └── organisms/    # Complex components
├── context/          # State management
├── hooks/            # Custom hooks
├── pages/            # Page components
└── types/            # TypeScript types
```

### Naming Conventions
- **Components**: PascalCase (`ProductCard.tsx`)
- **Hooks**: camelCase with 'use' prefix (`useProducts.ts`)
- **Utils**: camelCase (`formatPrice.ts`)
- **Types**: PascalCase (`Product`, `CartItem`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`)

### Code Style
- Use functional programming patterns
- Prefer const over let
- Use arrow functions
- Destructure props and state
- Use template literals for strings

## Testing Guidelines

### Unit Tests
```typescript
describe('ProductCard', () => {
  it('should render product information', () => {
    // Test implementation
  });

  it('should call onAddToCart when button clicked', () => {
    // Test implementation
  });
});
```

### Test Coverage
- Aim for 80%+ coverage
- Test edge cases
- Test error handling
- Test user interactions

## Documentation

### Code Comments
- Explain "why", not "what"
- Document complex logic
- Add JSDoc for public APIs
- Keep comments up to date

### README Updates
Update README.md when:
- Adding new features
- Changing setup process
- Updating dependencies
- Adding new scripts

## Review Process

### Before Requesting Review
- [ ] All tests pass
- [ ] Linter passes
- [ ] Build succeeds
- [ ] Documentation updated
- [ ] Self-review completed

### During Review
- Respond to feedback promptly
- Ask questions if unclear
- Make requested changes
- Re-request review after updates

## Getting Help

- **Questions**: Open an issue with "Question:" prefix
- **Bugs**: Open an issue with "Bug:" prefix
- **Features**: Open an issue with "Feature Request:" prefix
- **Discussion**: Use GitHub Discussions

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Credited in release notes
- Mentioned in documentation

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing! 🎉
