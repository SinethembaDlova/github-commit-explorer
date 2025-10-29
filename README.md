# 🔍 GitHub Commit Explorer

> **An application for exploring GitHub repositories, analyzing commits, and managing favorite commits.**

[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A modern, type-safe web application built with React 18 and TypeScript that provides a seamless interface for exploring GitHub repositories, viewing commit histories, and managing favorite commits with persistent storage.

## 🚀 Live Demo

**Try it now:** [https://github-commit-explorer-five.vercel.app/](https://github-commit-explorer-five.vercel.app/)

Test with popular GitHub usernames like `octocat`, `torvalds`, `sindresorhus`, or any public GitHub user!

---

## ✨ Features

### Core Functionality

- 🔍 **Repository Explorer** - Browse any GitHub user's public repositories with detailed metadata
- 📜 **Commit History Viewer** - Paginated commit lists (10 per page) with infinite scroll capability
- ⭐ **Favorites Management** - Mark commits as favorites with persistent localStorage storage
- 📊 **Detailed Commit Analysis** - View file changes, diffs, additions/deletions with syntax highlighting
- 🔄 **Smart Sorting** - Sort commits by newest or oldest with optimized rendering
- ✅ **Form Validation** - Real-time GitHub username validation with helpful error messages

### Technical Highlights

- 🛡️ **Comprehensive Error Handling** - Graceful handling of 404s, rate limiting, network errors
- 📱 **Fully Responsive** - Premium UI that works seamlessly on desktop, tablet, and mobile
- 💾 **Persistent State** - Favorites survive browser sessions via Zustand persistence middleware
- 🎨 **Premium Design System** - Elevated cards, subtle shadows, and smooth transitions

## 🛠️ Tech Stack

### Frontend Framework

- **React 18.3** - Latest React with concurrent features and automatic batching
- **TypeScript 5.0** - Full type safety with strict mode enabled
- **React Router v6** - Client-side routing with nested routes and params
- **System Fonts Only** - Zero external font requests for instant loading

### State Management

- **Zustand** - Lightweight state management with middleware support
- **Persistence Middleware** - Automatic localStorage sync for favorites

### Build & Development

- **Vite 5.0** - Lightning-fast HMR and optimized production builds
- **ESBuild** - Ultra-fast TypeScript compilation
- **Rollup** - Optimized production bundling with code splitting

### Testing

- **Vitest** - Vite-native test runner with instant feedback
- **React Testing Library** - Component testing with best practices
- **Happy DOM** - Fast DOM implementation for tests

### UI & Styling

- **Shadcn/ui** - Accessible, customizable component library built on Radix UI
- **Tailwind CSS v4** - Utility-first CSS with minimal custom styling
- **Lucide React** - Beautiful, consistent icon library
- **System Fonts** - Zero external font requests for instant loading
- **Custom Favicon** - GitHub logo branding in browser tabs

### API Integration

- **GitHub REST API v3** - Public API endpoints (no authentication required)
- **Native Fetch** - Modern, promise-based HTTP client

## Project Structure

```
├── components/
│   ├── RepositoryList.tsx      # Repository list component
│   ├── CommitList.tsx          # Commit list with sorting
│   ├── FavoritesList.tsx       # Favorites sidebar
│   └── CommitDetails.tsx       # Commit details modal with diffs
├── services/
│   └── githubApi.ts            # GitHub API service layer
├── store/
│   └── githubStore.ts          # Zustand store for state management
└── tests/
├── types/
│   └── github.ts               # TypeScript interfaces
├── views/
│   ├── Home.tsx                 # Home page with username input
│   └── Repo.tsx                 # Repository and commits page
├── App.tsx                      # Main app with routing
├── Global.css                   # Global cascading stlye sheet
├── main.tsx                     # Main app with routing

```

## Installation & Setup

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Run development server**:

   ```bash
   npm run dev
   ```

3. **Run tests**:

   ```bash
   npm test
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## Usage

1. **Home Page**: Enter a GitHub username (e.g., `octocat`, `sinethembadlova`)
2. **Repository Page**:
   - Select a repository from the left panel
   - View commits in the center panel
   - Sort commits by newest or oldest
   - Click "View Details" to see file changes and diffs
   - Click "Favorite" to add commits to your favorites
   - View and manage favorites in the right panel
   - Load more commits with pagination

## API Integration

The app uses the GitHub REST API v3 (public endpoints, no authentication required):

- **Repositories**: `GET /users/:username/repos`
- **Commits**: `GET /repos/:username/:repo/commits`
- **Commit Details**: `GET /repos/:username/:repo/commits/:sha`

## State Management

Zustand store manages:

- List of repositories
- List of commits for selected repository
- List of favorite commits (persisted to localStorage)
- Loading and error states
- Pagination state
- Sort order

## Testing

Unit tests are written using Vitest and cover:

- Repository fetching
- Commit fetching with pagination
- Favorites management (add/remove)
- Error handling
- Sort order management
- State reset functionality

Run tests with:

```bash
npm test              # Run tests once
npm run test:ui       # Run tests with UI
npm run test:coverage # Run tests with coverage report
```

## Error Handling

The application handles:

- Invalid GitHub usernames (with validation)
- User not found (404 errors)
- API rate limiting (403 errors)
- Empty repositories
- Empty commit lists
- Network errors

## Key Implementation Details

### Form Validation

- GitHub username format validation (alphanumeric and hyphens)
- Length validation (max 39 characters)
- Real-time error feedback

### Pagination

- Fetches 10 commits per page
- "Load More" button for additional commits
- Automatically detects when no more commits are available

### Commit Details

- Shows file changes with additions/deletions
- Displays diff patches with syntax highlighting
- Color-coded changes (green for additions, red for deletions)
- Statistics for files changed, total additions, and deletions

### Favorites

- Stored in localStorage using Zustand persist middleware
- Prevents duplicates
- Shows repository name, author, date, and commit SHA
- Easy removal with delete button

## Code Quality

- **TypeScript**: Full type safety with interfaces for all API responses
- **Modular**: Separated concerns with components, services, store, and types
- **Reusable**: Components designed for reusability
- **Clean Code**: Descriptive names, comments for complex logic
- **Error Boundaries**: Proper error handling at API and component levels

## 🏗️ Architecture & Design Decisions

### Architectural Patterns

- **Service Layer Pattern** - Abstracted API calls in `services/githubApi.ts` for testability
- **Container/Presentational** - Smart container components with dumb presentational children
- **Custom Hooks** - Reusable logic extraction (can be extended further)
- **Type-Safe State** - Zustand store with full TypeScript inference

## 🧪 Testing Strategy

### What's Tested

- ✅ **State Management** - All Zustand actions and state transitions
- ✅ **API Integration** - Mocked GitHub API responses
- ✅ **Error Scenarios** - 404s, rate limiting, network failures
- ✅ **Persistence** - localStorage save/load functionality
- ✅ **Business Logic** - Sorting, pagination, duplicate prevention

### Test Commands

```bash
npm test              # Run tests once
npm run test:ui       # Interactive test UI
npm run test:coverage # Coverage report
```

### Coverage Goals

- **Statements**: >80%
- **Branches**: >75%
- **Functions**: >80%
- **Lines**: >80%

## 🚀 Future Enhancements

### Planned Features

- [ ] **Advanced Search** - Filter commits by message, author, or date range
- [ ] **Commit Comparison** - Side-by-side diff view for any two commits
- [ ] **Export Functionality** - Export favorites as JSON/CSV
- [ ] **Analytics Dashboard** - Commit frequency graphs, contributor stats

### Technical Improvements

- [ ] **GitHub OAuth** - Authentication for higher rate limits (5000 req/hr)
- [ ] **Virtual Scrolling** - Handle repositories with thousands of commits
- [ ] **E2E Tests** - Playwright or Cypress integration
- [ ] **Storybook** - Component documentation and visual testing

## 🤝 Contributing

This project follows industry-standard practices:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes using conventional commits (`git commit -m 'feat: add amazing feature'`)
4. **Push** to your branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

## 👨‍💻 Author

Built with ❤️ using React, TypeScript, and modern web technologies.

---

**⭐ If you found this project helpful, please consider giving it a star!**