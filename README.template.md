# React + TypeScript + Vite Template

A modern, feature-based React template with TypeScript, Tailwind CSS, and best practices.

## 🚀 Features

### ⚡ Development Experience

- **Vite** - Fast build tool and dev server
- **TypeScript** - Type safety and better DX
- **React 18** - Latest React with Concurrent Features
- **Hot Module Replacement** - Instant feedback during development

### 🎨 Styling & UI

- **Tailwind CSS** - Utility-first CSS framework
- **CVA (Class Variance Authority)** - Type-safe component variants
- **Tailwind Merge** - Intelligent Tailwind class merging
- **Prettier Plugin** - Auto-sort Tailwind classes

### 🏗️ Architecture

- **Feature-based Structure** - Organized by features, not file types
- **Path Mapping** - Clean imports with `@/` alias
- **Barrel Exports** - Clean and organized exports

### 🔧 Code Quality

- **ESLint** - Code linting with React/TypeScript rules
- **Prettier** - Code formatting with import sorting
- **Husky** - Git hooks for code quality
- **Lint Staged** - Run linting on staged files only

### 📡 Data Management

- **React Query** - Server state management
- **Zustand** - Client state management with persistence
- **Axios** - HTTP client with interceptors

### 🧪 Forms & Validation

- **React Hook Form** - Performant forms with easy validation
- **Zod** - TypeScript-first schema validation

### 🔗 Routing

- **React Router DOM** - Declarative routing

## 📁 Project Structure

\`\`\`
src/
├── app/ # App-level configuration
│ ├── providers/ # App providers (QueryClient, etc.)
│ ├── routes/ # Route configuration
│ └── App.tsx # Main app component
├── features/ # Feature-based modules
│ ├── auth/ # Authentication feature
│ │ ├── components/ # Feature-specific components
│ │ ├── api/ # Feature-specific API calls
│ │ ├── hooks/ # Feature-specific hooks
│ │ └── store/ # Feature-specific state
│ ├── profile/ # User profile feature
│ └── chat/ # Chat feature
├── shared/ # Shared/reusable code
│ ├── components/ # Reusable UI components
│ ├── hooks/ # Reusable custom hooks
│ ├── utils/ # Utility functions
│ └── lib/ # Third-party library configurations
└── styles/ # Global styles
\`\`\`

## 🛠️ Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+
- Bun (recommended) or npm/yarn/pnpm

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone <your-repo-url>
   cd your-project-name
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   bun install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   bun run dev
   \`\`\`

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📜 Available Scripts

- \`bun run dev\` - Start development server
- \`bun run build\` - Build for production
- \`bun run preview\` - Preview production build
- \`bun run lint\` - Run ESLint
- \`bun run lint:fix\` - Fix ESLint errors
- \`bun run format\` - Format code with Prettier + ESLint
- \`bun run type-check\` - Run TypeScript check
- \`bun run ci\` - Run all checks (lint, format, type-check, build)

## 🎯 Features Included

### Authentication System

- **Login/Signup Forms** - With validation using React Hook Form + Zod
- **Auth State Management** - Using Zustand with persistence
- **Protected Routes** - Route guards for authenticated users
- **API Integration** - Ready-to-use auth API functions

### UI Components

- **Button Component** - With variants using CVA
- **Input Component** - Form input with proper styling
- **Form Components** - Login and signup forms with validation

### Utilities & Hooks

- **useDebounce** - Debounce values for search/API calls
- **useMediaQuery** - Responsive breakpoints
- **Date Formatting** - Date utilities with dayjs
- **Class Name Utilities** - cn() function for conditional classes

## 🔧 Configuration

### Environment Variables

Create a \`.env\` file in the root directory:

\`\`\`env
VITE_API_BASE_URL=http://localhost:3001/api
\`\`\`

### Path Aliases

The template includes \`@/\` path alias configured in:

- \`vite.config.ts\` - For Vite bundler
- \`tsconfig.app.json\` - For TypeScript

### Code Style

- **ESLint** - Configured with React, TypeScript, and A11y rules
- **Prettier** - Configured with Tailwind class sorting
- **Import Sorting** - Automatic import organization

## 🚀 Deployment

### Build for Production

\`\`\`bash
bun run build
\`\`\`

The built files will be in the \`dist\` directory.

### Deploy to Vercel

\`\`\`bash
npm i -g vercel
vercel
\`\`\`

### Deploy to Netlify

\`\`\`bash
npm run build

# Upload dist/ folder to Netlify

\`\`\`

## 📚 Learn More

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://typescriptlang.org)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [React Query Documentation](https://tanstack.com/query)
- [Zustand Documentation](https://zustand-demo.pmnd.rs)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vite](https://vitejs.dev) - Next Generation Frontend Tooling
- [React](https://react.dev) - A JavaScript library for building user interfaces
- [TypeScript](https://typescriptlang.org) - JavaScript with syntax for types
- [Tailwind CSS](https://tailwindcss.com) - A utility-first CSS framework
